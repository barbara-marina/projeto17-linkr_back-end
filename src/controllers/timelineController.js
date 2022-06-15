import db from "../../config/db.js";
import timelineRepository from "../repositories/timelineRepository.js";

export async function createPublication(req, res){
    const {url, description} = req.body;
    const hashtags = timelineRepository.getHashtagsInDescription(description);
    const userId = res.locals.user.id;
    
    try {
        if(description.length > 0 && hashtags.length > 0){
            await timelineRepository.insertPostUserDescription(userId, url, description);
            const lastPost = await timelineRepository.getPostByUrl(url, userId);
            
            const [post] = lastPost.rows;
            const verifyPost = !post.deleted || !post || lastPost.rowCount !== 1;
            if(verifyPost) return res.sendStatus(401);
            
            const postId = post.id;
            for(const hashtag of hashtags){
                timelineRepository.insertHashtag(postId, hashtag);
            }
            return res.sendStatus(201);
        }
        if(description.length > 0 && hashtags.length === 0){
            await timelineRepository.insertPostUserDescription(userId, url, description);
            return res.sendStatus(201);
        }

        await timelineRepository.insertPostUserDescription(userId, url, null);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPublications(req, res){
    try {
        const result = await timelineRepository.getPosts(false);
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updatePublication(req, res){
    const {id} = req.params;
    const user = res.locals.user;
    const {description} = req.body;

    try {
        const postFind = await db.query(`
            SELECT * FROM "posts" WHERE id = $1
        `, [id]);
        const [post] = postFind.rows;

        const verifyPost = !post || post.deleted || postFind.rowCount !== 1 || post.userId !== user.id || post.id !== Number(id);
        if(verifyPost) return res.sendStatus(401);
        
        const hashtagsAnterior = timelineRepository.getHashtagsInDescription(post.description);
        const hashtagsAtual = timelineRepository.getHashtagsInDescription(description);

        if(hashtagsAnterior.length > 0){
            for(const hashtag of hashtagsAnterior){
                await db.query(`
                    DELETE FROM "hashtags" WHERE "name" = $1 AND "postId" = $2
                `, [hashtag, id]);
            }
        }
        if(description.length > 0 && hashtagsAtual.length > 0){
            await db.query(`
                UPDATE "posts" SET "description" = $1 WHERE "id" = $2
            `, [description, id]);
            
            for(const hashtag of hashtagsAtual){
                await db.query(`
                    INSERT INTO "hashtags" ("postId", "name", "createdAt")
                    VALUES ($1, $2, NOW())
                `, [id, hashtag]);
            }
            return res.sendStatus(200);
        }
        if(description.length > 0 && hashtagsAtual.length === 0){
            await db.query(`
                UPDATE "posts" SET "description" = $1 WHERE "id" = $2
            `, [description, id]);
            return res.sendStatus(200);
        }

        await db.query(`
            UPDATE "posts" SET "description" = $1 WHERE "id" = $2
        `, [null, id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deletePublication(req, res){
    const {id} = req.params;
    const user = res.locals.user;

    try {
        const post = await timelineRepository.getPostById(id);
        const [postId] = post.rows;

        const verifyPost = postId.deleted || !postId || post.rowCount !== 1 || postId.userId !== user.id;
        if(verifyPost) return res.sendStatus(401);

        await timelineRepository.updateDeletePost(id, true);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
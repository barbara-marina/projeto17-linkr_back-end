import db from "../../config/db";

export async function createLike(req, res){
    const {id} = req.params;
    const user = req.locals.user;
    
    try {
        console.log('teste request');
        //TODO: validar se o post existe e está publicado
        const post = await db.query(`
            SELECT * FROM "posts" WHERE id = $1
        `, [Number(id)]);
        const [postId] = post.rows;

        const verifyPost = !postId || postId.deleted || post.rowCount !== 1;
        if(verifyPost) return res.sendStatus(401);

        //TODO: validar se o usuario ja deu like -> não deve permitir
        const like = await db.query(`
            SELECT * FROM "likes" WHERE userId = $1 AND postId = $2
        `, [user.id, Number(id)]);
        
        const [likeId] = like.rows;
        if(likeId) return res.sendStatus(401);

        await db.query(`
            INSERT INTO "likes" ("userId", "postId", "createdAt")
            VALUES ($1, $2, NOW())
        `, [user.id, Number(id)]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createDislike(req, res){
    const {id} = req.params;
    const user = req.locals.user;
    
    try {
        console.log('teste request');
        //TODO: validar se o post existe e está publicado
        const post = await db.query(`
            SELECT * FROM "posts" WHERE id = $1
        `, [Number(id)]);
        const [postId] = post.rows;

        const verifyPost = !postId || postId.deleted || post.rowCount !== 1;
        if(verifyPost) return res.sendStatus(401);

        //TODO: validar se o usuario ja deu like -> deve permitir
        const allowDislike = await db.query(`
            SELECT * FROM "likes" WHERE userId = $1 AND postId = $2
        `, [user.id, Number(id)]);
        
        const [dislikeId] = allowDislike.rows;
        if(!dislikeId) return res.sendStatus(401);
        
        await db.query(`
            DELETE FROM "likes" WHERE "userId" = $1 AND "postId" = $2
        `, [user.id, Number(id)]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
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
    console.log('teste');
}

export async function deletePublication(req, res){
    console.log('teste');
}
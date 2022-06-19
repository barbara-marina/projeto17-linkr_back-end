import hashtagRepository from "../repositories/hashtagRepository.js";

export async function getHashtags(req, res){

    try {
        const hashtags = await hashtagRepository.getHashtags();
        res.send(hashtags.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getHashtagPosts(req, res){
    const { hashtag } = req.params;

    try {
        const posts = await hashtagRepository.getHashtagPosts(hashtag);
      
        if (posts.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(posts.rows);
        
    } catch (error) {
        res.status(500).send(error);       
    }
}

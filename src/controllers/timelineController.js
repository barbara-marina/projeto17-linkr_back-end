import timelineRepository from "../repositories/timelineRepository.js";

export async function createPublication(req, res){
    const {url, description} = req.body;
    const hashtags = timelineRepository.getHashtagsInDescription(description);
    try {
        if(description.length > 0 && hashtags.length > 0){
            await timelineRepository.insertPostUserDescription(userId, url, description);
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
        console.log('teste');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
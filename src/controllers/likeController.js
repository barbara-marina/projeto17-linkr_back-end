import likeRepository from "../repositories/likeRepository.js";
//import timelineRepository from "../repositories/timelineRepository.js";

export async function checkLiked(req, res){

    const {id:postId, userId} = req.params;

    try {
        const liked = await likeRepository.getLikeUserPost(userId, postId);
        console.log(liked.rowCount);

        if(liked.rowCount === 0) res.status(201).send(false);
        else res.status(201).send(true);
        
        
    } catch (error) {
        
    }
    
}

export async function createLike(req, res){

    const {postId, userId} = req.params;

    try {

        const like = await likeRepository.getLikeUserPost(userId, postId);
        if(like.rowCount !== 0) res.sendStatus(200);

        await likeRepository.insertLikeUserPost(userId, postId);
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createDislike(req, res){

    const {postId, userId} = req.params;
   
    try {
        const like = await likeRepository.getLikeUserPost(userId, postId);
        if(like.rowCount === 0) res.sendStatus(200);

        await likeRepository.deleteLikeUserPost(userId, postId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
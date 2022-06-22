import likeRepository from "../repositories/likeRepository.js";
import timelineRepository from "../repositories/timelineRepository.js";

export async function checkLiked(req, res){

    const {postId, userId} = req.params;
    
    try {

        const liked = await likeRepository.getLikeUserPost(userId, postId);

        if(liked.rowCount === 0) return res.status(201).send(false);

        else res.status(201).send(true);
        
    } catch (error) {
        res.sendStatus(500);
    }
    
}

export async function createLike(req, res){

    const {postId, userId} = req.params;
    console.log('entrou no create');
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
    console.log('entrou no delete');
    try {
        const like = await likeRepository.getLikeUserPost(userId, postId);
        if(like.rowCount === 0) return res.sendStatus(200);

        await likeRepository.deleteLikeUserPost(userId, postId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getLikesPost(req, res){
    const {id} = req.params;
    try {
        const posts = await timelineRepository.getPostById(Number(id));
        const [postId] = posts.rows;

        const verifyPost = !postId || posts.rowCount !== 1 || postId.id !== Number(id) || postId.deleted;
        if(verifyPost) return res.sendStatus(401);

        const likesPost = await likeRepository.getLikesPostId(Number(id)); 
        res.send(likesPost.rows).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
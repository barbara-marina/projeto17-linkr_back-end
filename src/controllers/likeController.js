import likeRepository from "../repositories/likeRepository.js";
import timelineRepository from "../repositories/timelineRepository.js";

export async function createLike(req, res){
    const {id} = req.params;
    const user = res.locals.user;
    
    try {
        const post = await timelineRepository.getPostById(parseInt(id));
        
        const [postId] = post.rows;
        const verifyPost = !postId || postId.deleted || post.rowCount !== 1 || postId.id !== Number(id);
        if(verifyPost) return res.sendStatus(401);

        const like = await likeRepository.getLikeUserPost(user.id, parseInt(id));
        
        const [likeId] = like.rows;
        const verifyLike = likeId && like.rowCount === 1;
        if(verifyLike) return res.sendStatus(401);

        await likeRepository.insertLikeUserPost(user.id, parseInt(id));
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createDislike(req, res){
    const {id} = req.params;
    const user = res.locals.user;
    
    try {
        const post = await timelineRepository.getPostById(parseInt(id));
        
        const [postId] = post.rows;
        const verifyPost = !postId || postId.deleted || post.rowCount !== 1 || postId.id !== Number(id);
        if(verifyPost) return res.sendStatus(401);

        const allowDislike = await likeRepository.getLikeUserPost(user.id, parseInt(id));    
        
        const [dislikeId] = allowDislike.rows;
        const verifyDislike = !dislikeId || allowDislike.rowCount !== 1;
        if(verifyDislike) return res.sendStatus(401);
        
        await likeRepository.deleteLikeUserPost(user.id, parseInt(id));
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
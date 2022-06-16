import likeRepository from "../repositories/likeRepository.js";
import timelineRepository from "../repositories/timelineRepository.js";

export async function createLike(req, res){
    const {id} = req.params;
    const user = req.locals.user;
    
    try {
        //TODO: validar se o post existe e está publicado
        const post = await timelineRepository.getPostById(parseInt(id));
        const [postId] = post.rows;
        const verifyPost = !postId || postId.deleted || post.rowCount !== 1 || postId.id !== Number(id);
        if(verifyPost) return res.sendStatus(401);

        //TODO: validar se o usuario ja deu like -> não deve permitir
        const like = await likeRepository.getLikeUserPost(user.id, parseInt(id));
        const [likeId] = like.rows;
        if(likeId) return res.sendStatus(401);

        await likeRepository.insertLikeUserPost(user.id, parseInt(id));
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
        //TODO: validar se o post existe e está publicado
        const post = await timelineRepository.getPostById(parseInt(id));
        const [postId] = post.rows;
        const verifyPost = !postId || postId.deleted || post.rowCount !== 1;
        if(verifyPost) return res.sendStatus(401);

        //TODO: validar se o usuario ja deu like -> deve permitir
        const allowDislike = await likeRepository.getLikeUserPost(user.id, parseInt(id));    
        const [dislikeId] = allowDislike.rows;
        if(!dislikeId) return res.sendStatus(401);
        
        await likeRepository.deleteLikeUserPost(user.id, parseInt(id));
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
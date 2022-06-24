import commentsRepository from "../repositories/commentsRepository.js";

export async function createComment(req, res){
    const {postId, comment} = req.body;
    const userId = res.locals.user.id;

    try {
        await commentsRepository.postComments(userId, postId, comment);
        return res.sendStatus(201);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

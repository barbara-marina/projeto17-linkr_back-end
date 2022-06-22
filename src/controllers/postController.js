import postRepository from "../repositories/postRepository.js";

export async function sharePost(req, res){
    const { postId } = req.params;
    const { user } = res.locals;

    try {
        await postRepository.sharePost(parseInt(postId), Number(user.id));

        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
    }

}

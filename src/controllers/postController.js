import postRepository from "../repositories/postRepository.js";

export async function sharePost(req, res){
    const { username } = req.body;
    const { id } = req.params;
    const user = res.locals.user;

    try {
        await postRepository.sharePost(username, parseInt(id), Number(user.id));

        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
    }

}
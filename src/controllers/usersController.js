import timelineRepository from "../repositories/timelineRepository.js";
import usersRepository from "../repositories/usersRepository.js";

async function getPostsByUserId(req, res) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    try {
        const userData = await usersRepository.getUserData(parseInt(id));

        const findConection = await usersRepository.imFollowing(userId, id);
        let imFollowing = false;
        if ( findConection.rowCount === 1 ) imFollowing = true;
        
        if (userData.rowCount === 0) return res.status(404).send("Usuário não existe.");
        
        const result = await usersRepository.getPostsByUserId(parseInt(id));
        const likeUser = await timelineRepository.likesUsersPost();
        const posts = [];

        for(let post of result.rows){

            const iLiked = likeUser.rows.some( element => element.userId == parseInt(userId) && element.postId == post.id )
            const whoLiked = likeUser.rows.filter(element => element.postId == post.id);
            const whoShared = [];
            const thePost = {iLiked:iLiked, whoLiked:whoLiked, post:post, whoShared:whoShared}
            posts.push(thePost);

        }

        res.send({
            userData: userData.rows[0],
            posts: posts,
            imFollowing: imFollowing
        });
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function listUsers(req, res) {
    
    const { username } = req.params;

    try {
        const data = await usersRepository.listUsers(username);
        res.send(data.rows);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const usersController = {
    getPostsByUserId,
    listUsers
};

export default usersController;
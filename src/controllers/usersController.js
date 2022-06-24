import commentsRepository from "../repositories/commentsRepository.js";
import postRepository from "../repositories/postRepository.js";
import timelineRepository from "../repositories/timelineRepository.js";
import usersRepository from "../repositories/usersRepository.js";

async function getPostsByUserId(req, res) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    try {
        const userData = await usersRepository.getUserData(parseInt(id));
        if (userData.rowCount === 0) return res.status(404).send("Usuário não existe.");

        const findConection = await usersRepository.imFollowing(userId, id);
        let imFollowing = false;
        if ( findConection.rowCount === 1 ) imFollowing = true;
        
        const result = await usersRepository.getPostsByUserId(parseInt(id));
        const likeUser = await timelineRepository.likesUsersPost();
        const wasShared = await postRepository.shares();
        const commentsResult = await commentsRepository.getComments(parseInt(userId));
        commentsResult.rows.forEach(element => {
            element.postComments.forEach(e => {
                if(e.isMyFollowing !== true){
                    e.isMyFollowing = false;
                }
            })
        });

        const posts = [];

        for(let post of result.rows){

            const iLiked = likeUser.rows.some( element => element.userId == parseInt(userId) && element.postId == post.id )
            const whoLiked = likeUser.rows.filter(element => element.postId == post.id);
            const whoShared = wasShared.rows.filter(element => element.postId === post.id)
            const comments = [];
            commentsResult.rows.forEach(element => {
                element.postComments.forEach(e => e.postId === post.id && comments.push(e))
            });
            const thePost = {iLiked:iLiked, whoLiked:whoLiked, whoShared:whoShared, comments:comments,post:post}
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
    
    const { userId, username } = req.params;

    console.log(typeof(userId))


    try {
        const data = await usersRepository.listUsers(parseInt(userId), username);
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
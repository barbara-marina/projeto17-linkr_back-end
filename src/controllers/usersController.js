import timelineRepository from "../repositories/timelineRepository.js";
import usersRepository from "../repositories/usersRepository.js";

async function getPostsByUserId(req, res) {
    const { id } = req.params;

    try {
        const userData = await usersRepository.getPostsByUserId(parseInt(id));
        const likeUser = await timelineRepository.likesUsersPost();

        if (userData.rowCount === 0) return res.status(404).send("Usuário não existe.");

        if (userData.rows[0].userPosts[0]===null) {
            userData.rows[0].userPosts.shift();
        }
        
        res.send({
            posts: userData.rows[0],
            usersLikes: likeUser.rows
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
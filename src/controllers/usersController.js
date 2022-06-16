import db from "../../config/db.js";
import usersRepository from "../repositories/usersRepository.js";

async function getPostsByUserId(req, res) {
    const { id } = req.params;

    try {
        const data = await usersRepository.getPostsByUserId(parseInt(id));
        res.send(data.rows[0]);
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
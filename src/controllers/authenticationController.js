import db from "../../config/db.js";
import bcrypt from 'bcrypt'
import { v4 } from "uuid";

export async function createUser(req, res){

    const {email, username, password, picture_url} = req.body;
    const passCrypt = bcrypt.hashSync(password, 10);

    console.log("entrou nos routers")

    
    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [`${email.toLowerCase()}`]);
        if(user.rowCount !== 0) return res.status(422).send('Email já cadastrado!');
        
        db.query(`INSERT 
                    INTO users (email, password, username, picture)
                    VALUES ($1, $2, $3, $4)`, [email.toLowerCase(), passCrypt, username, picture_url])
        
        res.status(201).send('usuário cadastrado com sucesso!');
        
    } catch (error) {
            res.status(404).send('falha ao cadastrar usuário');
        
    }

}

export async function login(req, res){

    const token = v4();

    res.sendStatus(201);
}

export async function logout(req, res){
    
    const { authorization} = req.headers;
    const token = authorization.replace('Bearer', '').trim();

    try {
        const updateSession = await db.query(`
                    UPDATE sessions
                    SET valid = false
                    WHERE token = $1 AND valid = $2
                    `,[token, true]);

        console.log(updateSession)
        
        updateSession.rowCount === 1 
        ? res.sendStatus(200)
        : res.status(404).send('não foi possivel fazer o logout');

    } catch (error) {
        res.status(403).send('Erro no servidor, procure o SAC');
    } 
}
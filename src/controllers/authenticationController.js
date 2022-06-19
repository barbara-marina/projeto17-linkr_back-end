import db from "../../config/db.js";
import bcrypt from 'bcrypt'
import { v4 } from "uuid";
import infoUsers from "../repositories/infoUsers.js";

export async function createUser(req, res){

    const {email, username, password, picture_url} = req.body;
    const passCrypt = bcrypt.hashSync(password, 10);
    const lowerEmail = email.toLowerCase();
   
    try {
        const isEmail = await infoUsers.isThereEmail(email.toLowerCase());  //search email in the db and return true or false
        if(isEmail) return res.status(422).send('Email já cadastrado!');
        
        const create = infoUsers.createUser(lowerEmail, passCrypt, username, picture_url);
        res.status(201).send('usuário cadastrado com sucesso!');
        
    } catch (error) {
        res.status(404).send('falha ao cadastrar usuário');
    }

}

export async function login(req, res){

    const { email, password } = req.body;
    const token = v4();

    try {

        const isThereEmail = await infoUsers.isThereEmail(email);
        if(!isThereEmail) return res.status(404).send('Email não encontrado');
        
        const user = await infoUsers.login(email);

        const matchPass = bcrypt.compareSync(password, user.password);
        if(!matchPass) return res.status(404).send('Senha inválida');

        const session = await infoUsers.createSession(user.id, token);

        res.status(200).json({"token":token, "id": user.id, "image":user.picture, "username":user.username});
        
    } catch (error) {
        console.log('Erro ao logar: ', error);
        res.sendStatus(404)
    }


}

export async function logout(req, res){

    const { token } = req.body;

    try {
        const tryOut = await infoUsers.logout(token);

        tryOut.rowCount === 1 
        ? res.sendStatus(200)
        : res.status(404).send('não foi possivel fazer o logout');

    } catch (error) {
        res.status(404);
    } 

}    

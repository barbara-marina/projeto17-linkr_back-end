import db from "../../config/db.js";
import bcrypt from 'bcrypt'

export async function createUser(req, res){

    const {email, username, password, picture_url} = req.body;
    const passCrypt = bcrypt.hashSync(password, 10);
    
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
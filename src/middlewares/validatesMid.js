import db from "../../config/db.js";

export async function checkEmailOnDB (req, res, next){
    const { email } = req.body;
    
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [`${email.toLowerCase()}`]);

    user.rowCount !== 0 
    ? res.status(422).send('Email já cadastrado!')
    : next();

}
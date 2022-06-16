import db from "../../config/db.js";

export async function isThereEmail(email){
 
    const user = await db.query(`
                            SELECT * FROM users
                            WHERE email = $1
                        `,[email]);

    return user.rowCount === 0 
    ? false : true ;
}

export async function createUser(email, passCrypt, username, picture_url){
    
    const create = await db.query(`INSERT 
                                    INTO users (email, password, username, picture)
                                    VALUES ($1, $2, $3, $4)`, 
                                    [email, passCrypt, username, picture_url]);

    return create.rowCount === 0
    ? false : true ; 
}

export async function login(email){
    try {
        const user = await db.query(`
            SELECT  u.id, u.email, u.password
            FROM users u 
            WHERE email = $1
                    
        `,[email]);

    return user.rows[0];
        
    } catch (error) {
    console.log('PER37: Falha ao criar logar')
    }
}

export async function createSession(userId, token){
    try {
        await db.query(`
                INSERT INTO sessions ("userId", token) 
                VALUES ($1, $2)         
    `,[userId, `${token}`]);
    
    return 0;    
        
    } catch (error) {
    console.log('Falha ao criar session',error)
    }
}

export async function checkToken(token){

    const isThere =  await db.query(`
                                    SELECT s.valid,
                                    FROM sessions s
                                    JOIN users u 
                                    WHERE token = $1
                                    `,[token]);

    return isThere.rows[0]

}//não terminado

export async function getUserByToken(token){

    const {userId, valid} =  await db.query(`
                                    SELECT s."userId", s.valid
                                    FROM sessions s
                                    WHERE token = $1
                                      `,[token]);

    return valid ? userId : valid;

}//não terminado


const infoUsers = {
    isThereEmail,
    createUser,
    login,
    createSession,
 
}

export default infoUsers
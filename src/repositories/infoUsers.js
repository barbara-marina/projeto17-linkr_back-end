import db from "../../config/db.js";

export async function getUserByEmail(email){

    return db.query(`
        SELECT * FROM users 
        WHERE email = $1
    `,[email]);

}

export async function createSession(userId, token){
    try {
        await db.query(`
                INSERT INTO sessions ('userId', token) 
                VALUES ($1, $2)         
    `,[userId, `${token}`]);

    return 0;
        
    } catch (error) {
    console.log('Falha ao criar session')
    }
}

export async function userLogout(email){

    return db.query(`
        UPDATE sessions
        SET valid = false
        WHERE token = $1 AND valid = $2
    `,[token, true]);

}

export async function getUserByToken(token){

    const {userId, valid} =  await db.query(`
                                    SELECT s."userId", s.valid
                                    FROM sessions s
                                    WHERE token = $1
                                      `,[token]);

    return valid ? userId : valid;

}
export async function getUserByToken(email){

    return db.query(`
        SELECT * FROM users 
        WHERE email = $1
    `,[email]);

}



const infoUsers = {
    getUserByEmail,
    getUserByToken,
    createSession,
    userLogout
}

export default infoUsers
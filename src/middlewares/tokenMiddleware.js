import db from "../../config/db.js";

export async function validationToken(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    
    if(!token) return res.sendStatus(401);

    try {
        const session = await db.query(`
            SELECT * FROM "sessions" WHERE token = $1
        `, [token]);
        const [userSession] = session.rows;
        
        const verifySession = !userSession || session.rowCount !== 1 || !userSession.valid;
        if(verifySession) return res.sendStatus(401);

        const user = await db.query(`
            SELECT * FROM "users" WHERE id = $1
        `, [userSession.userId]);
        const [userId] = user.rows;

        const verifyUser = !userId || user.rowCount !== 1;
        if(verifyUser) return res.sendStatus(401);

        res.locals.user = userId;
        console.log('passei no token')
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
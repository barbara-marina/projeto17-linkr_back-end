import db from "../../config/db.js";

export async function validationToken(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if(!token) return res.sendStatus(401);

    try {
        const session = await db.query(`
            SELECT * FROM "sessions" WHERE token = $1
        `, [token]);
        const [userSession] = session;
        
        const verifySession = !userSession || session.rowCount > 0 || !userSession.valid;
        if(verifySession) return res.sendStatus(401);

        const user = await db.query(`
            SELECT * FROM "users" WHERE id = $1
        `, [session.userId]);
        const [userId] = user;

        const verifyUser = !userId || user.rowCount > 0;
        if(verifyUser) return res.sendStatus(401);

        res.locals.user = userId;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
import db from "../../config/db.js";

export async function getHashtags(req, res){

    try {
        const hashtags = await db.query(`
            SELECT hashtags.name, COUNT(hashtags.name) AS "amount"
            FROM hashtags
            GROUP BY hashtags.name
            ORDER BY "amount"
            DESC
            LIMIT 10; 

        `);

        res.send(hashtags.rows);

    } catch (error) {
        res.status(500).send(error);
        
    }

}

export async function getHashtagPosts(req, res){
    const { hashtag } = req.params;


    try {

        const posts = await db.query(`

            SELECT p.*, u.id AS "userId", u.username, u.picture,
            COUNT(l."postId") AS "likes"
            FROM "posts" p
            LEFT JOIN "likes" l ON l."postId" = p."id"
            JOIN "users" u ON p."userId" = u."id"
            WHERE description LIKE $1
            GROUP BY p."id", u."id"
            ORDER BY p."createdAt" DESC LIMIT 20

        `, [('%#' + hashtag + '%')]);

        
        if (posts.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(posts.rows);
        
    } catch (error) {
        
        res.status(500).send(error);
        
    }

}

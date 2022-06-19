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
            SELECT * FROM posts WHERE description LIKE $1;
        `, [('%#' + hashtag + '%')]);

        
        if (posts.rowCount === 0) {
            return res.sendStatus(406);
        }

        res.send(posts.rows);
        
    } catch (error) {
        
        res.status(500).send(error);
        
    }

}

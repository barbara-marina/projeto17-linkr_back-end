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

export async function getHashtag(req, res){
    const name = req.params.hashtag;


    try {

        const hashtag = await db.query(`
            SELECT * FROM hashtags WHERE name=$1;
        `, [name]);
        
        if (hashtag.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(hashtag.rows);
        
    } catch (error) {
        
        res.status(500).send(error);
        
    }

}

export async function getHashtagPosts(req, res){
    const name = req.params.hashtag;

    try {

        const posts = await db.query(`
            SELECT * FROM posts WHERE description LIKE '%${name}%';
        `);

        res.send(posts.rows)
        
    } catch (error) {
        res.status(500).send(error);
    }
}
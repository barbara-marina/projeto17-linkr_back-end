import db from "../../config/db.js";

export async function getHashtags(req, res){

    try {
        const hashtags = await db.query(`
            SELECT * FROM hashtags
        `);

        const hashtagName = hashtags.rows;
        const newhash = hashtagName.map((h) => h.name);
        //const result = newhash.filter((h, i) => newhash.indexOf(h) === i);

        res.send(newhash);

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
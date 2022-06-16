import db from "../../config/db.js";

export async function getHashtags(req, res){

    try {
        const hashtags = await db.query(`
            SELECT * FROM hashtags LIMIT 10
        `)

        res.send(hashtags.rows);

    } catch (error) {
        res.status(500).send(error);
        
    }

}

export async function getHashtag(req, res){
    const { id } = req.params;
    
    try {

        const hashtag = await db.query(`
            SELECT id FROM hashtags WHERE name=$1;
        `, [id]);
        
        if (hashtag.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(hashtag.rows);
        
    } catch (error) {
        
        res.status(500).send(error);
        
    }

}
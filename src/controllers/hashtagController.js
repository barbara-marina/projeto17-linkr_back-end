import db from "../../config/db.js";

export async function getHashtags(req, res){
    
    try {
        const hashtags = await db.query(`
            SELECT * FROM hashtags
        `)

        res.send(hashtags.rows);
        
    } catch (error) {
            res.status(404).send('falha');
        
    }

}

export async function getHashtag(req, res){
    const { id } = req.params;
    
    try {

        const hashtag = await db.query(`
            SELECT * FROM users WHERE id=$1;
        `, [id]);
        
        if (hashtag.rowCount === 0) {
            return res.sendStatus(404)
        }

        
    } catch (error) {
            res.status(404).send('falha');
        
    }

}
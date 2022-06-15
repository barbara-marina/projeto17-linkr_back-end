import db from "../../config/db.js";

function getHashtagsInDescription(str){
    const arrStr = str.toLowerCase().split(' ');
    const arrHashtags = arrStr.filter(item => item.startsWith('#'));
    
    return arrHashtags;
} 

async function insertPostUserDescription(userId, url, description){
    return db.query(`
        INSERT INTO "posts" (
            "userId", "url", "description", "deleted", "createdAt"
        ) VALUES ($1, $2, $3, $4, NOW())
    `, [userId, url, description, false]);
}

async function insertHashtag(postId, hashtag){
    return db.query(`
        INSERT INTO "hashtags" ("postId", "name", "createdAt")
        VALUES ($1, $2, NOW())
    `, [postId, hashtag]);
}

const timelineRepository = {
    getHashtagsInDescription,
    insertPostUserDescription,
    insertHashtag
};

export default timelineRepository;
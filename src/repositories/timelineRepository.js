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

async function getPosts(boolean){
    return db.query(`
        SELECT * FROM "posts" WHERE "deleted" = $1
        ORDER BY "createdAt" DESC LIMIT 20
    `, [boolean]);
}

async function getPostByUrl(url, userId){
    return db.query(`
        SELECT * FROM "posts" 
        WHERE "url" = $1 AND "userId" = $2 
        ORDER BY "createdAt" DESC LIMIT 1
    `, [url, userId]);
}

const timelineRepository = {
    getHashtagsInDescription,
    insertPostUserDescription,
    insertHashtag,
    getPosts, 
    getPostByUrl
};

export default timelineRepository;
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
        SELECT p.*, u.id, u.username, u.picture
        COUNT(l."postId") AS "likes"
        FROM "posts" p
        JOIN "likes" l ON l."postId" = p."id"
        JOIN "users" u ON p."userId" = u."id"
        WHERE p."deleted" = $1
        GROUP BY p."id", u."id"
        ORDER BY p."createdAt" DESC LIMIT 20
    `, [boolean]);
}

async function getPostByUrl(url, userId){
    return db.query(`
        SELECT * FROM "posts" 
        WHERE "url" = $1 AND "userId" = $2 
        ORDER BY "createdAt" DESC LIMIT 1
    `, [url, userId]);
}

async function getPostById(id){
    return db.query(`
        SELECT * FROM "posts" WHERE "id" = $1
    `, [id]);
}

async function updateDeletePost(id, boolean){
    return db.query(`
        UPDATE "posts" SET "deleted" = $1 WHERE "id" = $2
    `, [id, boolean]);
}

async function deleteHashtagName(postId, hashtag){
    return db.query(`
        DELETE FROM "hashtags" WHERE "name" = $1 AND "postId" = $2
    `, [hashtag, postId]);
}

async function updatePostDescription(id, description){
    return db.query(`
        UPDATE "posts" SET "description" = $1 WHERE "id" = $2
    `, [description, id]);
}

const timelineRepository = {
    getHashtagsInDescription,
    insertPostUserDescription,
    insertHashtag,
    getPosts, 
    getPostByUrl, 
    getPostById,
    updateDeletePost,
    deleteHashtagName,
    updatePostDescription
};

export default timelineRepository;
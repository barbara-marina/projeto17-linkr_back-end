import db from "../../config/db.js";

async function getLikeUserPost(userId, postId){
    return db.query(`
        SELECT * FROM "likes" WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function insertLikeUserPost(userId, postId){
    return db.query(`
        INSERT INTO "likes" ("userId", "postId", "createdAt")
        VALUES ($1, $2, NOW())
    `, [userId, postId]);
}

async function deleteLikeUserPost(userId, postId){
    return db.query(`
        DELETE FROM "likes" WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function getLikesPostId(postId){
    return db.query(`
        SELECT l.*, u.username FROM "likes" l 
        JOIN "users" u ON l."userId" = u.id
        WHERE l."postId" = $1
        `, [postId]);
}
    
const likeRepository = {
    getLikeUserPost,
    insertLikeUserPost,
    deleteLikeUserPost,
    getLikesPostId
};

export default likeRepository;
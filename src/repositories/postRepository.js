import db from "../../config/db.js";

async function sharePost(postId, userId){
    return db.query(`
        INSERT INTO "shared" ("postId", "repostUserId")
        VALUES ($1, $2)
    `, [postId, userId]);
}

async function countShare(postId){
    return db.query(`
        SELECT COUNT("postId")
        FROM shared
        WHERE "postId"=$1
    `, [postId]);
}

async function shared(){
    return db.query(`
        SELECT s."postId", COUNT(s."postId") AS "quantity"
        FROM shared s
        JOIN "posts" p ON s."postId"=p.id
        JOIN "users"
        GROUP BY s."postId"
        ORDER BY "quantity"
    `);
}

async function shares(){
    return db.query(`
        SELECT s.*, u.username
        FROM "shared" s
        JOIN "users" u ON s."repostUserId" = u.id
    `)
}

const postRepository = {
    sharePost, countShare, shared, shares
}

export default postRepository;
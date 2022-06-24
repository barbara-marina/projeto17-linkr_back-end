import db from "../../config/db.js";

async function sharePost(postId, userId){
    return db.query(`
        INSERT INTO "shared" ("postId", "repostUserId")
        VALUES ($1, $2)
    `, [postId, userId]);
}

async function shares(){
    return db.query(`
        SELECT s.*, u.username
        FROM "shared" s
        JOIN "users" u ON s."repostUserId" = u.id
    `)
}

const postRepository = {
    sharePost, shares
}

export default postRepository;
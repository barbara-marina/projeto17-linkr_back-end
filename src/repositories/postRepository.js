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

const postRepository = {
    sharePost, countShare
}

export default postRepository;
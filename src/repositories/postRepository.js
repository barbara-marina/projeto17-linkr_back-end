import db from "../../config/db.js";

async function sharePost(postId, userId){
    return db.query(`
        INSERT INTO "shared" ("postId", "repostUserId")
        VALUES ($1, $2)
    `, [postId, userId]);
}

const postRepository = {
    sharePost
}

export default postRepository;
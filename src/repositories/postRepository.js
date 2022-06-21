import db from "../../config/db.js";

async function sharePost(id, userId){
    return db.query(`
        UPDATE "posts" SET "shares"="shares"+1 WHERE id=$1 AND "userId" = $2
    `, [id, userId]);

}

const postRepository = {
    sharePost
}

export default postRepository;
import db from "../../config/db.js";

async function sharePost(username, id, userId){
    return db.query(`
        UPDATE "posts" SET "shares"="shares"+1, "repostedBy"=$1 WHERE id=$2 AND "userId" = $3
    `, [username, id, userId]);

}

const postRepository = {
    sharePost
}

export default postRepository;
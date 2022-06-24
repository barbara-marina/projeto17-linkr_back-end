import db from "../../config/db.js";

function follow(userId, userToFollow){

    return db.query(`INSERT 
                        INTO followers ("userId", "following")
                        VALUES ($1, $2)`, [userId, userToFollow]);

}

function unFollow(userId, userToUnFollow){

    return db.query(`DELETE FROM followers f
                        WHERE f."userId" = $1 AND f."following" = $2`,
                        [userId, userToUnFollow]);
}

const followRepository = { follow, unFollow}

export default followRepository;
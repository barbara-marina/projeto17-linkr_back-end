import db from "../../config/db.js";

function follow(userId, userToFollow){

    return db.query(`INSERT 
                        INTO followers ("userId", "following")
                        VALUES ($1, $2)`, [userId, userToFollow]);

}

const followRepository = { follow }

export default followRepository;
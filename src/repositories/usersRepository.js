import db from "../../config/db.js";

function getUserData(id) {
    return db.query(`
        SELECT username, picture, id
        FROM users
        WHERE id=$1;
     `, [id]);
}

function getPostsByUserId(id) {
    return db.query(`
        SELECT p.*, u.username, u.picture, COUNT(l."postId") AS "likes"
        FROM users u
        LEFT JOIN posts p ON p."userId" = u.id
        LEFT JOIN likes l ON l."postId" = p.id
        WHERE "deleted"=$1 AND u.id = $2
        GROUP BY l."postId", p.id, u.username, u.picture
        ORDER BY p."createdAt" DESC LIMIT 20;
        `, [false, id]);
}


function listUsers(userId, username) {
    return db.query(`
                    SELECT users.id, users.username, users.picture, users.username = sigo."following" AS following
                    FROM users
                    LEFT JOIN (
                        SELECT u.username, us.username AS "following"
                        FROM followers f
                        LEFT JOIN users u ON u.id=f."userId"
                        LEFT JOIN users us ON us.id=f."following"
                        WHERE f."userId"=$1
                    ) AS sigo
                    ON sigo."following" = users.username
                    WHERE users.username ILIKE $2 AND users.id != $1
                    ORDER BY following;`, [userId, `%${username}%`]);

}
function imFollowing(userId, anotherUserId){
    
    return db.query(`
            SELECT * 
            FROM followers f
            WHERE f."userId" = $1 AND f.following = $2`,
            [userId, anotherUserId]);

}

const usersRepository = {
    getUserData,
    getPostsByUserId,
    listUsers,
    imFollowing
};

export default usersRepository;
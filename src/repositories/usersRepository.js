import db from "../../config/db.js";

function getPostsByUserId(id) {
    return db.query(`
        SELECT u.id, u.username, u.picture, JSON_AGG(post) AS "userPosts"
        FROM users u
        LEFT JOIN (SELECT p.*, COUNT(l."postId") AS "likes"
            FROM posts p
            LEFT JOIN likes l ON l."postId" = p.id
            WHERE "deleted"=$1
            GROUP BY p.id
            ORDER BY p."createdAt" DESC LIMIT 20)
        AS post
        ON post."userId"=u.id
        WHERE  u.id=$2
        GROUP BY (u.username, u.id);
        `, [false, id]);
}

function listUsers(username) {
    return db.query(`
    SELECT u.id, u.username, u.picture
FROM users u
WHERE u.username ILIKE $1;
    `, [(username + "%")]);
}

const usersRepository = {
    getPostsByUserId,
    listUsers
};

export default usersRepository;
import db from "../../config/db.js";

function postComments(userId, postId, comment) {
    return db.query(`
        INSERT INTO comments 
        ("userId", "postId", "comment")
        VALUES ($1, $2, $3)
    `, [userId, postId, comment]);
}

function getComments(userId) {
    return db.query(`
    SELECT p.id, JSON_AGG(teste) AS "postComments"
    FROM posts p
    JOIN (
        SELECT c."postId", c."userId", u.username,u.picture, c.comment,
        "userFollowers".following = c."userId" AS "isMyFollowing", p."userId"=c."userId" AS "isMe"
        FROM comments c
        JOIN posts p ON p.id=c."postId" 
        JOIN users u 
        LEFT JOIN (
            SELECT * 
            FROM followers f
            WHERE f."userId"=$1
        ) AS "userFollowers"
        ON "userFollowers".following = u.id
        ON u.id = c."userId" 
        ORDER BY c."createdAt"
    ) AS teste
    ON teste."postId" = p.id
    GROUP BY p.id;
    `, [userId]);
}

const commentsRepository = {
    postComments,
    getComments
};

export default commentsRepository;
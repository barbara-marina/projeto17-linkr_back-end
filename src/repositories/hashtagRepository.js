import db from "../../config/db.js";

function getHashtags(){
    return db.query(`
        SELECT h.name, COUNT(h.name) AS "amount"
        FROM hashtags h
        JOIN "posts" p ON h."postId"=p.id
        WHERE deleted=false
        GROUP BY h.name
        ORDER BY "amount"
        DESC
        LIMIT 10; 

    `);
}

function getHashtagPosts(hashtag){
    return db.query(`
        SELECT p.*, u.id AS "userId", u.username, u.picture,
        COUNT(l."postId") AS "likes",
        COUNT(c."postId") AS "comments"
        FROM "posts" p
        LEFT JOIN "likes" l ON l."postId" = p."id"
        LEFT JOIN "comments" c ON c."postId" = p."id"
        JOIN "users" u ON p."userId" = u."id"
        WHERE description ILIKE $1
        GROUP BY p."id", u."id"
        ORDER BY p."createdAt" DESC LIMIT 20
    `, [(`%#${hashtag}%`)]);
}

const hashtagRepository =  { getHashtags, getHashtagPosts }

export default hashtagRepository;
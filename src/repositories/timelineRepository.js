import db from "../../config/db.js";

function getHashtagsInDescription(str){
    if(!str) return [];

    const arrStr = str.toLowerCase().split(' ');
    const arrHashtags = arrStr.filter(item => item.startsWith('#'));
    
    return arrHashtags;
} 

async function insertPostUserDescription(userId, url, description, metadados){
    const {
        url: urlMetadata, description: descriptionMetadata, title, image
    } = metadados;

    return db.query(`
        INSERT INTO "posts" (
            "userId", "url", "description", "urlMetadata",
            "descriptionMetadata", "title", "image",
            "deleted", "createdAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    `, [userId, url, description, urlMetadata, descriptionMetadata, title, image, false]);
}

async function insertHashtag(postId, hashtag){
    return db.query(`
        INSERT INTO "hashtags" ("postId", "name", "createdAt")
        VALUES ($1, $2, NOW())
    `, [postId, hashtag]);
}

async function getPosts(userId, boolean){
    return db.query(`
    (SELECT p.id, p."userId", p.url, p."description", 
 p."urlMetadata", p."descriptionMetadata", p."image", p."title", p.deleted, p."createdAt",
 u.username, u.picture, null AS "repostUserId",
COUNT(l."postId") AS "likes"
FROM "posts" p
LEFT JOIN "likes" l ON l."postId" = p."id"
JOIN (
   select * from "followers" where "userId" = $1
) AS tst
   ON tst."following" = p."userId"
LEFT JOIN (
    select * from "shared" s
) AS rpt
    ON tst."following" = rpt."repostUserId"
JOIN "users" u ON p."userId" = u."id"
WHERE p."deleted" = $2 
GROUP BY p."id", u."id", tst."id", tst."userId", tst.following
ORDER BY p."createdAt")
UNION
(SELECT p.id, p."userId", p.url, p."description", 
 p."urlMetadata", p."descriptionMetadata", p."image", p."title", p.deleted, p."createdAt",
 u.username,u.picture,s."repostUserId",
COUNT(l."postId") AS "likes"
FROM shared s
JOIN posts p ON p.id = s."postId"
JOIN "users" u ON u."id" = p."userId"
LEFT JOIN "likes" l ON l."postId" = p."id"
JOIN (
    SELECT * FROM "followers" f WHERE f."userId" = $1
) AS tst
    ON tst."following" = s."repostUserId"
WHERE p."deleted" = $2
GROUP BY p."id", u."id", tst."id", tst."userId", tst.following, s."repostUserId"
ORDER BY p."createdAt")

ORDER BY "createdAt" DESC
LIMIT 20
    
    `, [userId, boolean]);
}

async function getPostByUrl(url, userId){
    return db.query(`
        SELECT * FROM "posts" 
        WHERE "url" = $1 AND "userId" = $2 
        ORDER BY "createdAt" DESC LIMIT 1
    `, [url, userId]);
}

async function getPostById(id){
    return db.query(`
        SELECT * FROM "posts" WHERE "id" = $1
    `, [id]);
}

async function updateDeletePost(id, userId){
    return db.query(`
        UPDATE "posts" SET "deleted" = $1 WHERE id = $2 AND "userId" = $3
    `, [true, id, userId]);
}

async function deleteHashtagName(postId, hashtag){
    return db.query(`
        DELETE FROM "hashtags" WHERE "name" = $1 AND "postId" = $2
    `, [hashtag, postId]);
}

async function updatePostDescription(id, description){
    return db.query(`
        UPDATE "posts" SET "description" = $1 WHERE "id" = $2
    `, [description, id]);
}

async function likesUsersPost(){
    return db.query(`
        SELECT l.*, u.username
        FROM "likes" l
        JOIN "users" u ON l."userId" = u.id
    `, []);
}

const timelineRepository = {
    getHashtagsInDescription,
    insertPostUserDescription,
    insertHashtag,
    getPosts, 
    getPostByUrl, 
    getPostById,
    updateDeletePost,
    deleteHashtagName,
    updatePostDescription, 
    likesUsersPost
};

export default timelineRepository;

import { Router } from "express";

import { createPublication, deletePublication, getAllPosts, getPostRedirect, getPublications, updatePublication } from "../controllers/timelineController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";
import schemaPost from "../schemas/schemaPost.js";
import schemaPostEdited from "../schemas/schemaPostEdited.js";

const timelineRouter = Router();

timelineRouter.post('/timeline', schemasValidations(schemaPost), validationToken, createPublication);
timelineRouter.get('/timeline/:userId', getPublications);
timelineRouter.put('/timeline/:id', schemasValidations(schemaPostEdited), validationToken, updatePublication);
timelineRouter.delete('/timeline/:id', validationToken, deletePublication);
timelineRouter.get('/timeline/open/:id', getPostRedirect);
timelineRouter.get('/timelineall', getAllPosts);

export default timelineRouter;

/* 
-- Na página de timeline (rota /timeline), agora devem aparecer somente os posts das pessoas que você segue e não mais todo mundo

#1
    SELECT p.*, u.id AS "userId", u.username,
    COUNT(l."postId") AS "likes", tst.id, tst."userId", tst.following
    FROM "posts" p
    LEFT JOIN "likes" l ON l."postId" = p."id"
    JOIN (
        select * from "followers" where "userId" = 2
    ) AS tst
        ON tst."following" = p."userId"
    JOIN "users" u ON p."userId" = u."id"
    WHERE p."deleted" = false
    GROUP BY p."id", u."id", tst."id", tst."userId", tst.following
    ORDER BY p."createdAt"
    
#2
    SELECT s."repostUserId", p.* 
    FROM shared s
    JOIN posts p ON s."postId" = p.id
    JOIN (
        SELECT * FROM "followers" f WHERE f."userId" = 4
         ) AS teste
    ON teste."following" = s."repostUserId"
    WHERE p."deleted" = false;
*/
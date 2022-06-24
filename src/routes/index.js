import { Router } from "express";

import autheticationRouter from "./authenticationRouter.js";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import usersRouter from "./usersRouter.js";
import likeRouter from "./likeRouter.js";
import postRouter from "./postRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use(autheticationRouter);
router.use(timelineRouter);
router.use(hashtagRouter);
router.use(usersRouter);
router.use(likeRouter);
router.use(postRouter);
router.use(commentsRouter);

export default router;
import { Router } from "express";

import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import autheticationRouter from "./authenticationRouter.js";
import likeRouter from "./likeRouter.js";

const router = Router();

router.use(hashtagRouter);
router.use(timelineRouter);
router.use(autheticationRouter);
router.use(likeRouter);

export default router;
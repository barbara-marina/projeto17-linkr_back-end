import { Router } from "express";

import autheticationRouter from "./authenticationRouter.js";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(autheticationRouter);
router.use(timelineRouter);
router.use(hashtagRouter);
router.use(usersRouter);

export default router;
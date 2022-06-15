import { Router } from "express";
import autheticationRouter from "./authenticationRouter.js";

import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import autheticationRouter from "./authenticationRouter.js";

const router = Router();

router.use(hashtagRouter);
router.use(timelineRouter);
router.use(autheticationRouter);

export default router;
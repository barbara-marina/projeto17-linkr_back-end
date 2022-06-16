import { Router } from "express";

import autheticationRouter from "./authenticationRouter.js";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();

router.use(autheticationRouter);
router.use(timelineRouter);
router.use(hashtagRouter);

export default router;
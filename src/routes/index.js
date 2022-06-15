import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";

const router = Router();

router.use(hashtagRouter);

export default router;
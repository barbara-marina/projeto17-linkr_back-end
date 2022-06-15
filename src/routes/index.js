import { Router } from "express";
import timelineRouter from "./timelineRouter.js";

const router = Router();

router.use(timelineRouter);

export default router;
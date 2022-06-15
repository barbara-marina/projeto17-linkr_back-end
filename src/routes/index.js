import { Router } from "express";
<<<<<<< HEAD
import timelineRouter from "./timelineRouter.js";

const router = Router();

router.use(timelineRouter);
=======
import autheticationRouter from "./authenticationRouter.js";

const router = Router();

router.use(autheticationRouter);
>>>>>>> main

export default router;
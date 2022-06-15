import { Router } from "express";
import autheticationRouter from "./authenticationRouter.js";

const router = Router();

router.use(autheticationRouter);

export default router;
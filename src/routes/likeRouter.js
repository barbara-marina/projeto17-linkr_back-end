import { Router } from "express";

import { createLike } from "../controllers/likeController";
import { validationToken } from "../middlewares/tokenMiddleware";

const likeRouter = Router();

likeRouter.post('/like/:id', validationToken, createLike);

export default likeRouter;
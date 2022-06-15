import { Router } from "express";

import { createLike } from "../controllers/likeController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const likeRouter = Router();

likeRouter.post('/like/:id', validationToken, createLike);

export default likeRouter;
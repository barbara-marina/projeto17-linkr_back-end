import { Router } from "express";

import { createDislike, createLike } from "../controllers/likeController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const likeRouter = Router();

likeRouter.post('/like/:id', validationToken, createLike);
likeRouter.delete('/dislike/:id', validationToken, createDislike);

export default likeRouter;
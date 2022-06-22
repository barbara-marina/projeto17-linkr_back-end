import { Router } from "express";

import { checkLiked, createDislike, createLike, getLikesPost } from "../controllers/likeController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const likeRouter = Router();

likeRouter.get('/like/:postId/:userId', validationToken, checkLiked);
likeRouter.post('/like/:postId/:userId', createLike);
likeRouter.delete('/dislike/:postId/:userId', createDislike);
likeRouter.get('/likes/:id', getLikesPost);

export default likeRouter;
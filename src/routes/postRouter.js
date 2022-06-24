import { Router } from "express";

import { sharePost } from "../controllers/postController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const postRouter = Router()

postRouter.post('/post/:postId', validationToken, sharePost);

export default postRouter;
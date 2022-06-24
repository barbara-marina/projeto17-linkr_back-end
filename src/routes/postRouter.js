import { Router } from "express";

import { countShare, sharePost } from "../controllers/postController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const postRouter = Router()

postRouter.post('/post/:postId', validationToken, sharePost);
postRouter.get('/post/:postId', countShare );

export default postRouter;
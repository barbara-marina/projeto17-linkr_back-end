import { Router } from "express";

import { sharePost } from "../controllers/postController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const postRouter = Router()

postRouter.put('/post/:id', validationToken, sharePost);

export default postRouter;
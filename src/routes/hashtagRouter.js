import { Router } from "express";

import { getHashtagPosts, getHashtags } from "../controllers/hashtagController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:hashtag", validationToken, getHashtagPosts);

export default hashtagRouter;

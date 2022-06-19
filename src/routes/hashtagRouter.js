import { Router } from "express";

import { getHashtagPosts, getHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:hashtag", getHashtagPosts);

export default hashtagRouter;
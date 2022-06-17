import { Router } from "express";

import { getHashtag, getHashtagPosts, getHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:hashtag", getHashtag);
hashtagRouter.get("/posts", getHashtagPosts);

export default hashtagRouter;
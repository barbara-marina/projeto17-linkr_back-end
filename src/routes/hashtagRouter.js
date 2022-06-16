import { Router } from "express";

import { getHashtag, getHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:hashtag", getHashtag);

export default hashtagRouter;
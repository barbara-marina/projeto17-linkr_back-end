import { Router } from "express";
import { getHashtags, getHashtag } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getHashtags);
hashtagRouter.get("/hashtag/:hashtag", getHashtag);

export default hashtagRouter;
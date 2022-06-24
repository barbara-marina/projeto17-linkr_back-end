import { Router } from "express";

import { follow, getFollowing, unFollow } from "../controllers/followController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const followRouter = Router();

followRouter.post("/follow/:userId/:userToFollow", validationToken, follow);
followRouter.delete("/unfollow/:userId/:userTounFollow", validationToken, unFollow);
followRouter.get('/following', validationToken, getFollowing);

export default followRouter;
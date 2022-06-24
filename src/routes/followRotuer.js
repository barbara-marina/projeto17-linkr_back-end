import { Router } from "express";

import { follow, unFollow } from "../controllers/followController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";



const followRouter = Router();

followRouter.post("/follow/:userId/:userToFollow", validationToken, follow);
followRouter.delete("/unfollow/:userId/:userTounFollow", validationToken, unFollow);



export default followRouter;

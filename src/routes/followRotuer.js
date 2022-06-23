import { Router } from "express";

import { follow } from "../controllers/followController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";



const followRouter = Router();

followRouter.post("/follow/:userId/:userToFollow", validationToken, follow);


export default followRouter;

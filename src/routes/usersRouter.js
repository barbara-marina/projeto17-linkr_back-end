import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get("/user/:id", validationToken, usersController.getPostsByUserId);
usersRouter.get("/user/list/:userId/:username", validationToken, usersController.listUsers);

export default usersRouter;
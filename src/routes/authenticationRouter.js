import { Router } from "express";
import { createUser } from "../controllers/authenticationController.js";
import { checkEmailOnDB } from "../middlewares/validatesMid.js";

const autheticationRouter = Router();

autheticationRouter.post("/sign-up", checkEmailOnDB,createUser);

export default autheticationRouter;
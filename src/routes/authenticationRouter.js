import { Router } from "express";
import { createUser } from "../controllers/authenticationController.js";

const autheticationRouter = Router();

autheticationRouter.post("/sign-up", createUser);



export default autheticationRouter;
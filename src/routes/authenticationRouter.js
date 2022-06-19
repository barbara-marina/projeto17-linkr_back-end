import { Router } from "express";
import { createUser, login, logout } from "../controllers/authenticationController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import schemaDataToRegister from "../schemas/schemaDataToRegister.js";
import schemaIsLogin from "../schemas/schemaIsLogin.js";

const autheticationRouter = Router();

autheticationRouter.post("/sign-up", schemasValidations(schemaDataToRegister),  createUser);
autheticationRouter.post("/sign-in", schemasValidations(schemaIsLogin), login);
autheticationRouter.put("/logout", logout)

export default autheticationRouter;
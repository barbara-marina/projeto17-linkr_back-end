import { Router } from "express";
import { createUser, login, logout } from "../controllers/authenticationController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import vDatasToRegister from "../schemas/userSchema.js";

const autheticationRouter = Router();

autheticationRouter.post("/sign-up", schemasValidations(vDatasToRegister),  createUser);
autheticationRouter.post("/sign-in", login);
autheticationRouter.put("/logout", logout)

export default autheticationRouter;
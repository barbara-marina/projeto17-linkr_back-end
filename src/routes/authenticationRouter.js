import { Router } from "express";
import { createUser } from "../controllers/authenticationController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import vDatasToRegister from "../schemas/userSchema.js";

const autheticationRouter = Router();

autheticationRouter.post("/sign-up", schemasValidations(vDatasToRegister),  createUser);



export default autheticationRouter;
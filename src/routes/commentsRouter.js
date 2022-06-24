import { Router } from "express";
import { createComment } from "../controllers/commentsController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import schemaComment from "../schemas/schemaComment.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";

const commentsRouter = Router();

commentsRouter.post("/comment", schemasValidations(schemaComment), validationToken , createComment);

export default commentsRouter;
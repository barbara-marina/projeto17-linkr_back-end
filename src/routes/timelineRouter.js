import { Router } from "express";
import { createPublication, getPublications } from "../controllers/timelineController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import schemaPost from "../schemas/schemaPost.js";

const timelineRouter = Router();

timelineRouter.post('/timeline', schemasValidations(schemaPost), createPublication);
timelineRouter.get('/timeline', getPublications);

export default timelineRouter;
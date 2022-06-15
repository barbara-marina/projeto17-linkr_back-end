import { Router } from "express";

import { createPublication, deletePublication, getPublications, updatePublication } from "../controllers/timelineController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";
import schemaPost from "../schemas/schemaPost.js";
import schemaPostEdited from "../schemas/schemaPostEdited.js";

const timelineRouter = Router();

timelineRouter.post('/timeline', schemasValidations(schemaPost), validationToken, createPublication);
timelineRouter.get('/timeline', getPublications);
timelineRouter.put('/timeline/:id', schemasValidations(schemaPostEdited), validationToken, updatePublication);
timelineRouter.delete('/timeline/:id', validationToken, deletePublication);

export default timelineRouter;
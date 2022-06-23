import { Router } from "express";

import { createPublication, deletePublication, getAllPosts, getPostRedirect, getPublications, updatePublication } from "../controllers/timelineController.js";
import { schemasValidations } from "../middlewares/schemasMiddleware.js";
import { validationToken } from "../middlewares/tokenMiddleware.js";
import schemaPost from "../schemas/schemaPost.js";
import schemaPostEdited from "../schemas/schemaPostEdited.js";

const timelineRouter = Router();

timelineRouter.post('/timeline', schemasValidations(schemaPost), validationToken, createPublication);
timelineRouter.get('/timeline/:userId', getPublications);
timelineRouter.put('/timeline/:id', schemasValidations(schemaPostEdited), validationToken, updatePublication);
timelineRouter.delete('/timeline/:id', validationToken, deletePublication);
timelineRouter.get('/timeline/open/:id', getPostRedirect);
timelineRouter.get('/timelineall', getAllPosts);

export default timelineRouter;
import { Router } from "express";
import authUsers from "./../routes/auth/auth.routes.js";
import provider from "./../routes/provider/provider.routes.js";
const routes = Router();

routes.use('/auth', authUsers)
routes.use('/provider', provider);

export default routes;
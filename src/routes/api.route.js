import { Router } from "express";
import authUsers from "./../routes/auth/auth.routes.js";
import provider from "./../routes/provider/provider.routes.js";
import users from "./../routes/users/users.routes.js";
const routes = Router();

routes.use('/auth', authUsers)
routes.use('/provider', provider);
routes.use('/users', users)

export default routes;
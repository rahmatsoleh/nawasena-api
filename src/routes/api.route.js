import { Router } from "express";
import authUsers from "./../routes/auth/auth.routes.js";
const routes = Router();

routes.use('/auth', authUsers)

export default routes;
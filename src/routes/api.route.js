import { Router } from "express";
import authUsers from "./../routes/auth/auth.routes.js";
import providerDetail from "./../routes/providerDetail/providerDetail.routes.js";
import users from "./../routes/users/users.routes.js";
import categoryProduct from "./../routes/categoryProduct/categoryProduct.routes.js";
import providerService from "./../routes/providerService/providerService.routes.js";
import historyService from "./../routes/historyService/historyService.routes.js";

const routes = Router();

routes.use("/auth", authUsers);
routes.use("/provider-detail", providerDetail);
routes.use("/users", users);
routes.use("/category-product", categoryProduct);
routes.use("/provider-service", providerService);
routes.use("/history-service", historyService);

export default routes;

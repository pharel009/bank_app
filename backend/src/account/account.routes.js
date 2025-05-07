import { Router } from "express";
import { accountController } from "./account.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

export const accountRouter = Router();

accountRouter.use(verifyUser);
accountRouter.post('/create', accountController.createAcount);
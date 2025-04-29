import { Router } from "express";
import { AccountController } from "./account.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

export const AccountRouter = Router();

AccountRouter.use(verifyUser)
AccountRouter.post('/create', AccountController.createAcount);
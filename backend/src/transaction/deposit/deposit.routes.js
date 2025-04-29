import { Router } from "express";
import { DepositController } from "./deposit.controller.js";
import { verifyUser } from "../../middlewares/verifyUser.js";


export const depositRouter = Router();

depositRouter.use(verifyUser)
depositRouter.post('/', DepositController.deposit)
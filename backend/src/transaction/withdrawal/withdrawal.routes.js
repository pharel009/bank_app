import { Router } from "express";
import { WithdrawalController } from "./withdrawal.controller.js";
import { verifyUser } from "../../middlewares/verifyUser.js";



export const withdrawalRouter = Router();

withdrawalRouter.use(verifyUser)
withdrawalRouter.post('/', WithdrawalController.withdrawal);
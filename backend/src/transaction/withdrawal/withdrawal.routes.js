import { Router } from "express";
import { withdrawalController } from "./withdrawal.controller.js";
import { verifyUser } from "../../middlewares/verifyUser.js";



export const withdrawalRouter = Router();

withdrawalRouter.use(verifyUser);
withdrawalRouter.post('/', withdrawalController.withdrawal);
import { Router } from "express";
import { depositController } from "./deposit.controller.js";
import { verifyUser } from "../../middlewares/verifyUser.js";


export const depositRouter = Router();

depositRouter.use(verifyUser)
depositRouter.post('/', depositController.deposit);
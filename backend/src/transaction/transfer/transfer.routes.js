import { TransferController } from "./transfer.controller.js";
import { Router } from "express";
import { verifyUser } from "../../middlewares/verifyUser.js";


export const transferRouter = Router()

transferRouter.use(verifyUser)

transferRouter.post('/', TransferController.transfer)

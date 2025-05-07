import { Router } from "express";
import { userController } from "./user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

export const userRouter = Router()

userRouter.post('/sign-up', userController.sign_up);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/get-users', userController.getAllUsers);
userRouter.get('/get-users/:id', userController.userById);
userRouter.delete('/delete-user/:id', userController.deleteUserById);
userRouter.get('/verify', userController.userVerify);
userRouter.get('/check', verifyUser, userController.checkAuth);
// userRouter.post('/forgot-password', forgotPassword);
// userRouter.put('/reset-password/:token', resetPassword);

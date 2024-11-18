import express, { Router } from 'express';
import { forgotPasswordController, LoginUser, LogoutUser, resetPasswordController, updateUserDetailsController, uploadController, UserRegister, verifyForgotPassword } from '../controllers/user.controllers.js';
import { AuthenticatedUser } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const userRouter = Router();

userRouter.post('/register', UserRegister);
userRouter.post('/login', LoginUser);
userRouter.post('/logout', AuthenticatedUser, LogoutUser);
userRouter.post('/upload', AuthenticatedUser, upload.single('avatar'), uploadController)
userRouter.put('/update-user', AuthenticatedUser, updateUserDetailsController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.post('/verify-password', verifyForgotPassword)
userRouter.post('/reset-password', resetPasswordController)

export default userRouter;
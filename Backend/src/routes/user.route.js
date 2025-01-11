import express, { Router } from 'express';
import { fetchLoginUserDetailController, forgotPasswordController, LoginUser, LogoutUser, refreshTokenController, resetPasswordController, updateUserDetailsController, uploadController, UserRegister, verifyForgotPasswordOTP } from '../controllers/user.controllers.js';
import { AuthenticatedUser } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const userRouter = Router();

userRouter.post('/register', UserRegister);
userRouter.post('/login', LoginUser);
userRouter.post('/logout', AuthenticatedUser, LogoutUser);
userRouter.post('/upload', AuthenticatedUser, upload.single('avatar'), uploadController)
userRouter.put('/update-user', AuthenticatedUser, updateUserDetailsController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.post('/verify-otp', verifyForgotPasswordOTP)
userRouter.post('/reset-password', resetPasswordController)
userRouter.post('/refresh-token', refreshTokenController)
userRouter.get('/user-details', AuthenticatedUser, fetchLoginUserDetailController)

export default userRouter;
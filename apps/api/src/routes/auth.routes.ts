import { Router } from "express";
import { sendOtp, verifyOtp, refreshToken, adminLogin } from "../controllers/auth.controller";
export const authRouter = Router();
authRouter.post("/send-otp",    sendOtp);
authRouter.post("/verify-otp",  verifyOtp);
authRouter.post("/refresh",     refreshToken);
authRouter.post("/admin/login", adminLogin);

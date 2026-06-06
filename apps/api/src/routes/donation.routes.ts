import { Router } from "express";
import { createOrder, verifyPayment, getDonations, getDonationById, getDonationReceipt } from "../controllers/donation.controller";
import { requireAdmin } from "../middleware/auth.middleware";
export const donationRouter = Router();
donationRouter.post("/order",       createOrder);
donationRouter.post("/verify",      verifyPayment);
donationRouter.get("/",             requireAdmin, getDonations);
donationRouter.get("/:id",          requireAdmin, getDonationById);
donationRouter.get("/:id/receipt",  getDonationReceipt);

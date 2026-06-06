import { Router } from "express";
import { getStats, getDonationChart, getMemberGrowth } from "../controllers/dashboard.controller";
import { requireAdmin } from "../middleware/auth.middleware";
export const dashboardRouter = Router();
dashboardRouter.get("/stats",           requireAdmin, getStats);
dashboardRouter.get("/donation-chart",  requireAdmin, getDonationChart);
dashboardRouter.get("/member-growth",   requireAdmin, getMemberGrowth);

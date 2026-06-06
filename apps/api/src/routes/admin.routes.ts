import { Router } from "express";
import { getAdmins, createAdmin, updateAdmin } from "../controllers/admin.controller";
import { requireAdmin, requireSuperAdmin } from "../middleware/auth.middleware";
export const adminRouter: Router = Router();
adminRouter.get("/",    requireAdmin, requireSuperAdmin, getAdmins);
adminRouter.post("/",   requireAdmin, requireSuperAdmin, createAdmin);
adminRouter.put("/:id", requireAdmin, requireSuperAdmin, updateAdmin);

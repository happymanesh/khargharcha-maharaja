import { Router } from "express";
import { registerVolunteer, getVolunteers, updateVolunteerStatus } from "../controllers/volunteer.controller";
import { requireMember, requireAdmin } from "../middleware/auth.middleware";
export const volunteerRouter = Router();
volunteerRouter.post("/",       requireMember, registerVolunteer);
volunteerRouter.get("/",        requireAdmin,  getVolunteers);
volunteerRouter.put("/:id",     requireAdmin,  updateVolunteerStatus);

import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const registerVolunteer = async (req: AuthRequest, res: Response) => {
  try {
    const { group, skills } = req.body;
    const existing = await prisma.volunteer.findUnique({ where: { memberId: req.member!.id } });
    if (existing) return res.status(400).json({ success: false, error: "Already registered as volunteer" });
    const volunteer = await prisma.volunteer.create({ data: { memberId: req.member!.id, group, skills: skills || [] }, include: { member: true } });
    res.status(201).json({ success: true, data: volunteer });
  } catch {
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

export const getVolunteers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const group = req.query.group as string;
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (group) where.group = { contains: group, mode: "insensitive" };
    const [volunteers, total] = await Promise.all([
      prisma.volunteer.findMany({ where, skip: (page - 1) * limit, take: limit, include: { member: true }, orderBy: { joinedAt: "desc" } }),
      prisma.volunteer.count({ where }),
    ]);
    res.json({ success: true, data: volunteers, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch volunteers" });
  }
};

export const updateVolunteerStatus = async (req: Request, res: Response) => {
  try {
    const volunteer = await prisma.volunteer.update({ where: { id: req.params.id }, data: req.body, include: { member: true } });
    res.json({ success: true, data: volunteer });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update volunteer" });
  }
};

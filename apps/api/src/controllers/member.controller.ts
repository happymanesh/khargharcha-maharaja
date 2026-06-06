import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const member = await prisma.member.findUnique({ where: { id: req.member!.id } });
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    res.json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, area, bloodGroup, language } = req.body;
    const member = await prisma.member.update({
      where: { id: req.member!.id },
      data: { name, email, area, bloodGroup, language },
    });
    res.json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update profile" });
  }
};

export const getMembers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const tier = req.query.tier as string;
    const area = req.query.area as string;

    const where: Record<string, unknown> = {};
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { mobile: { contains: search } },
      { email: { contains: search, mode: "insensitive" } },
    ];
    if (tier) where.membershipTier = tier;
    if (area) where.area = { contains: area, mode: "insensitive" };

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.member.count({ where }),
    ]);

    res.json({ success: true, data: members, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch members" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: req.params.id },
      include: { donations: { take: 5, orderBy: { createdAt: "desc" } }, registrations: { take: 5, orderBy: { registeredAt: "desc" }, include: { event: true } } },
    });
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    res.json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch member" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const member = await prisma.member.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: member });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update member" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    await prisma.member.update({ where: { id: req.params.id }, data: { isActive: false } });
    res.json({ success: true, message: "Member deactivated" });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete member" });
  }
};

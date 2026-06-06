import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";

export const getAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await prisma.adminUser.findMany({ select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true }, orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: admins });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch admins" });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, error: "Name, email and password required" });
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.adminUser.create({ data: { name, email, passwordHash, role: role || "COMMITTEE" }, select: { id: true, name: true, email: true, role: true, createdAt: true } });
    res.status(201).json({ success: true, data: admin });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create admin" });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;
    const data: Record<string, unknown> = { ...rest };
    if (password) data.passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.adminUser.update({ where: { id: req.params.id as string }, data, select: { id: true, name: true, email: true, role: true, isActive: true } });
    res.json({ success: true, data: admin });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update admin" });
  }
};

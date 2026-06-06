import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export interface AuthRequest extends Request {
  member?: { id: string; mobile: string };
  admin?: { id: string; email: string; role: string };
}

// Verify member JWT
export const requireMember = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, error: "No token provided" });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; mobile: string; type: string };
    if (payload.type !== "member") return res.status(401).json({ success: false, error: "Invalid token type" });

    req.member = { id: payload.id, mobile: payload.mobile };
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// Verify admin JWT
export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, error: "No token provided" });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; role: string; type: string };
    if (payload.type !== "admin") return res.status(401).json({ success: false, error: "Invalid token type" });

    const admin = await prisma.adminUser.findUnique({ where: { id: payload.id } });
    if (!admin || !admin.isActive) return res.status(403).json({ success: false, error: "Admin access denied" });

    req.admin = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// Only SUPER_ADMIN or ORG_ADMIN
export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.admin || !["SUPER_ADMIN", "ORG_ADMIN"].includes(req.admin.role)) {
    return res.status(403).json({ success: false, error: "Insufficient permissions" });
  }
  next();
};

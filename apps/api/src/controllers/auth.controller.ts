import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/prisma";
import { signMemberToken, signAdminToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

// Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/auth/send-otp
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, error: "Invalid mobile number" });
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert member with OTP
    await prisma.member.upsert({
      where: { mobile },
      create: { name: "", mobile, area: "", otp, otpExpiresAt },
      update: { otp, otpExpiresAt },
    });

    // TODO: Send OTP via MSG91
    // await sendSms(mobile, `Your Khargharcha Maharaja OTP is ${otp}. Valid for 10 minutes.`);

    // In development, return OTP in response
    const devData = process.env.NODE_ENV !== "production" ? { otp } : {};

    res.json({ success: true, message: "OTP sent successfully", ...devData });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};

// POST /api/auth/verify-otp
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { mobile, otp, name, area, bloodGroup, language, email } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ success: false, error: "Mobile and OTP are required" });
    }

    const member = await prisma.member.findUnique({ where: { mobile } });

    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    if (member.otpCode !== otp) return res.status(400).json({ success: false, error: "Invalid OTP" });
    if (!member.otpExpiresAt || member.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, error: "OTP expired" });
    }

    // Update member details and verify
    const updated = await prisma.member.update({
      where: { id: member.id },
      data: {
        name: name || member.name,
        area: area || member.area,
        bloodGroup: bloodGroup || member.bloodGroup,
        language: language || member.language,
        email: email || member.email,
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
        membershipNumber: member.membershipNumber || `KM${Date.now()}`,
      },
    });

    const accessToken = signMemberToken(updated.id, updated.mobile);
    const refreshToken = signRefreshToken(updated.id, "member");

    res.json({
      success: true,
      message: "OTP verified successfully",
      data: { accessToken, refreshToken, member: updated },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};

// POST /api/auth/refresh
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: "Refresh token required" });

    const payload = verifyRefreshToken(token);

    if (payload.type === "member") {
      const member = await prisma.member.findUnique({ where: { id: payload.id } });
      if (!member) return res.status(401).json({ success: false, error: "Member not found" });
      const accessToken = signMemberToken(member.id, member.mobile);
      return res.json({ success: true, data: { accessToken } });
    }

    if (payload.type === "admin") {
      const admin = await prisma.adminUser.findUnique({ where: { id: payload.id } });
      if (!admin || !admin.isActive) return res.status(401).json({ success: false, error: "Admin not found" });
      const accessToken = signAdminToken(admin.id, admin.email, admin.role);
      return res.json({ success: true, data: { accessToken } });
    }

    res.status(401).json({ success: false, error: "Invalid token" });
  } catch {
    res.status(401).json({ success: false, error: "Invalid refresh token" });
  }
};

// POST /api/auth/admin/login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password required" });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ success: false, error: "Invalid credentials" });

    await prisma.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });

    const accessToken = signAdminToken(admin.id, admin.email, admin.role);
    const refreshToken = signRefreshToken(admin.id, "admin");

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Login failed" });
  }
};

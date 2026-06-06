import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const signMemberToken = (id: string, mobile: string) =>
  jwt.sign({ id, mobile, type: "member" }, SECRET, { expiresIn: "7d" });

export const signAdminToken = (id: string, email: string, role: string) =>
  jwt.sign({ id, email, role, type: "admin" }, SECRET, { expiresIn: "12h" });

export const signRefreshToken = (id: string, type: "member" | "admin") =>
  jwt.sign({ id, type }, REFRESH_SECRET, { expiresIn: "30d" });

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET) as { id: string; type: string };

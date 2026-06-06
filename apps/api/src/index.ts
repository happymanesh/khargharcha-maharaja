import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

import { authRouter } from "./routes/auth.routes";
import { memberRouter } from "./routes/member.routes";
import { eventRouter } from "./routes/event.routes";
import { donationRouter } from "./routes/donation.routes";
import { volunteerRouter } from "./routes/volunteer.routes";
import { newsRouter } from "./routes/news.routes";
import { galleryRouter } from "./routes/gallery.routes";
import { adminRouter } from "./routes/admin.routes";
import { dashboardRouter } from "./routes/dashboard.routes";
import { errorHandler } from "./middleware/error.middleware";

const app: Express = express();
const PORT = process.env.PORT || 4000;

// ─── Security & Core Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS — allow website + admin dashboard
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.WEBSITE_URL || "",
    process.env.ADMIN_URL || "",
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// Strict rate limit for OTP endpoints
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,
  message: { success: false, error: "Too many OTP requests. Please wait 10 minutes." },
});
app.use("/api/auth/send-otp", otpLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Khargharcha Maharaja API", version: "1.0.0" });
});

app.use("/api/auth",       authRouter);
app.use("/api/members",    memberRouter);
app.use("/api/events",     eventRouter);
app.use("/api/donations",  donationRouter);
app.use("/api/volunteers", volunteerRouter);
app.use("/api/news",       newsRouter);
app.use("/api/gallery",    galleryRouter);
app.use("/api/admin",      adminRouter);
app.use("/api/dashboard",  dashboardRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 KM API running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}\n`);
});

export default app;

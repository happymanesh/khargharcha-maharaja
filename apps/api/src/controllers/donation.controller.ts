import { Request, Response } from "express";
import crypto from "crypto";
import { prisma } from "../utils/prisma";

const generateReceiptNumber = () => `KM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, category, donorName, donorMobile, donorEmail, memberId, isAnonymous } = req.body;

    if (!amount || amount < 1) return res.status(400).json({ success: false, error: "Invalid amount" });
    if (!donorName || !donorMobile) return res.status(400).json({ success: false, error: "Donor details required" });

    // TODO: Create Razorpay order
    // const Razorpay = require("razorpay");
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    // const order = await razorpay.orders.create({ amount: amount * 100, currency: "INR", receipt: generateReceiptNumber() });

    const donation = await prisma.donation.create({
      data: {
        donorName,
        donorMobile,
        donorEmail,
        amount,
        category: category || "GENERAL",
        status: "PENDING",
        receiptNumber: generateReceiptNumber(),
        memberId: memberId || null,
        isAnonymous: isAnonymous || false,
        // razorpayOrderId: order.id,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        donationId: donation.id,
        receiptNumber: donation.receiptNumber,
        amount: donation.amount,
        // razorpayOrderId: order.id,
        // razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { donationId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Verify Razorpay signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpaySignature;

    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: isValid ? "SUCCESS" : "FAILED",
        razorpayOrderId,
        razorpayPaymentId: isValid ? razorpayPaymentId : undefined,
      },
    });

    if (!isValid) return res.status(400).json({ success: false, error: "Payment verification failed" });

    res.json({ success: true, data: donation, message: "Payment verified successfully" });
  } catch {
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};

export const getDonations = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const category = req.query.category as string;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { member: { select: { name: true, mobile: true } } },
      }),
      prisma.donation.count({ where }),
    ]);

    res.json({ success: true, data: donations, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch donations" });
  }
};

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const donation = await prisma.donation.findUnique({
      where: { id: req.params.id },
      include: { member: true },
    });
    if (!donation) return res.status(404).json({ success: false, error: "Donation not found" });
    res.json({ success: true, data: donation });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch donation" });
  }
};

export const getDonationReceipt = async (req: Request, res: Response) => {
  try {
    const donation = await prisma.donation.findUnique({ where: { id: req.params.id } });
    if (!donation || donation.status !== "SUCCESS") {
      return res.status(404).json({ success: false, error: "Receipt not available" });
    }
    // TODO: Generate PDF receipt
    res.json({ success: true, data: { receiptNumber: donation.receiptNumber, amount: donation.amount, donorName: donation.donorName, createdAt: donation.createdAt } });
  } catch {
    res.status(500).json({ success: false, error: "Failed to generate receipt" });
  }
};

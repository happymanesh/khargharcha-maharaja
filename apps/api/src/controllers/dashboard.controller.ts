import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalMembers, newMembersThisMonth, totalDonations, donationsThisMonth, activeVolunteers, upcomingEvents, totalEvents, donationAmounts] = await Promise.all([
      prisma.member.count({ where: { isActive: true } }),
      prisma.member.count({ where: { isActive: true, createdAt: { gte: startOfMonth } } }),
      prisma.donation.count({ where: { status: "SUCCESS" } }),
      prisma.donation.count({ where: { status: "SUCCESS", createdAt: { gte: startOfMonth } } }),
      prisma.volunteer.count({ where: { status: "ACTIVE" } }),
      prisma.event.count({ where: { status: "UPCOMING", isPublished: true } }),
      prisma.event.count({ where: { isPublished: true } }),
      prisma.donation.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
    ]);

    const donationAmountsMonth = await prisma.donation.aggregate({ where: { status: "SUCCESS", createdAt: { gte: startOfMonth } }, _sum: { amount: true } });

    res.json({
      success: true,
      data: {
        totalMembers,
        newMembersThisMonth,
        totalDonations,
        donationsThisMonth,
        totalDonationAmount: donationAmounts._sum.amount || 0,
        donationAmountThisMonth: donationAmountsMonth._sum.amount || 0,
        activeVolunteers,
        upcomingEvents,
        totalEvents,
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
};

export const getDonationChart = async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const donations = await prisma.donation.findMany({
      where: { status: "SUCCESS", createdAt: { gte: since } },
      select: { amount: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date
    const grouped: Record<string, { amount: number; count: number }> = {};
    donations.forEach((d) => {
      const date = d.createdAt.toISOString().split("T")[0];
      if (!grouped[date]) grouped[date] = { amount: 0, count: 0 };
      grouped[date].amount += d.amount;
      grouped[date].count += 1;
    });

    const data = Object.entries(grouped).map(([date, v]) => ({ date, ...v }));
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch chart data" });
  }
};

export const getMemberGrowth = async (_req: Request, res: Response) => {
  try {
    const months = 6;
    const data = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);

      const count = await prisma.member.count({ where: { createdAt: { gte: start, lte: end } } });
      data.push({ month: start.toLocaleString("en", { month: "short", year: "2-digit" }), count });
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch member growth" });
  }
};

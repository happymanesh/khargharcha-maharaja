import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const type = req.query.type as string | undefined;
    const events = await prisma.event.findMany({
      where: { isPublished: true, ...(status && { status: status as never }), ...(type && { type: type as never }) },
      include: { _count: { select: { registrations: true } } },
      orderBy: { date: "asc" },
    });
    res.json({ success: true, data: events });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch events" }); }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id as string }, include: { _count: { select: { registrations: true } } } });
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });
    res.json({ success: true, data: event });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch event" }); }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.create({ data: req.body });
    res.status(201).json({ success: true, data: event });
  } catch { res.status(500).json({ success: false, error: "Failed to create event" }); }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.update({ where: { id: req.params.id as string }, data: req.body });
    res.json({ success: true, data: event });
  } catch { res.status(500).json({ success: false, error: "Failed to update event" }); }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await prisma.event.update({ where: { id: req.params.id as string }, data: { isPublished: false, status: "CANCELLED" } });
    res.json({ success: true, message: "Event cancelled" });
  } catch { res.status(500).json({ success: false, error: "Failed to delete event" }); }
};

export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventId = req.params.id as string;
    const event = await prisma.event.findUnique({ where: { id: eventId }, include: { _count: { select: { registrations: true } } } });
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });
    if (event._count.registrations >= event.capacity) return res.status(400).json({ success: false, error: "Event is full" });
    const registration = await prisma.eventRegistration.create({ data: { eventId, memberId: req.member!.id }, include: { event: true } });
    res.status(201).json({ success: true, data: registration });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "P2002") return res.status(400).json({ success: false, error: "Already registered for this event" });
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await prisma.eventRegistration.findMany({ where: { eventId: req.params.id as string }, include: { member: true }, orderBy: { registeredAt: "desc" } });
    res.json({ success: true, data: registrations, total: registrations.length });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch registrations" }); }
};

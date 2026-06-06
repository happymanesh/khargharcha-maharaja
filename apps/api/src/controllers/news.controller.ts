import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getNews = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const news = await prisma.newsItem.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: limit });
    res.json({ success: true, data: news });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch news" });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const item = await prisma.newsItem.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ success: false, error: "News item not found" });
    res.json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch news" });
  }
};

export const createNews = async (req: Request, res: Response) => {
  try {
    const { isPublished, ...rest } = req.body;
    const item = await prisma.newsItem.create({ data: { ...rest, isPublished: !!isPublished, publishedAt: isPublished ? new Date() : null } });
    res.status(201).json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create news" });
  }
};

export const updateNews = async (req: Request, res: Response) => {
  try {
    const { isPublished, ...rest } = req.body;
    const item = await prisma.newsItem.update({ where: { id: req.params.id }, data: { ...rest, ...(isPublished !== undefined && { isPublished, publishedAt: isPublished ? new Date() : null }) } });
    res.json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update news" });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    await prisma.newsItem.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "News deleted" });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete news" });
  }
};

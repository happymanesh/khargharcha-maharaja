import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getAlbums = async (_req: Request, res: Response) => {
  try {
    const albums = await prisma.galleryAlbum.findMany({ include: { _count: { select: { items: true } } }, orderBy: { sortOrder: "asc" } });
    res.json({ success: true, data: albums });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch albums" }); }
};

export const getAlbumItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.galleryItem.findMany({ where: { albumId: req.params.id as string }, orderBy: { sortOrder: "asc" } });
    res.json({ success: true, data: items });
  } catch { res.status(500).json({ success: false, error: "Failed to fetch items" }); }
};

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const album = await prisma.galleryAlbum.create({ data: req.body });
    res.status(201).json({ success: true, data: album });
  } catch { res.status(500).json({ success: false, error: "Failed to create album" }); }
};

export const addGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await prisma.galleryItem.create({ data: req.body });
    res.status(201).json({ success: true, data: item });
  } catch { res.status(500).json({ success: false, error: "Failed to add item" }); }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    await prisma.galleryItem.delete({ where: { id: req.params.id as string } });
    res.json({ success: true, message: "Item deleted" });
  } catch { res.status(500).json({ success: false, error: "Failed to delete item" }); }
};

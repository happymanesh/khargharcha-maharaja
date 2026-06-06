import { Router } from "express";
import { getAlbums, getAlbumItems, createAlbum, addGalleryItem, deleteGalleryItem } from "../controllers/gallery.controller";
import { requireAdmin } from "../middleware/auth.middleware";
export const galleryRouter: Router = Router();
galleryRouter.get("/albums",           getAlbums);
galleryRouter.get("/albums/:id/items", getAlbumItems);
galleryRouter.post("/albums",          requireAdmin, createAlbum);
galleryRouter.post("/items",           requireAdmin, addGalleryItem);
galleryRouter.delete("/items/:id",     requireAdmin, deleteGalleryItem);

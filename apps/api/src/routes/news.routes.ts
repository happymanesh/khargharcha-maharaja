import { Router } from "express";
import { getNews, getNewsById, createNews, updateNews, deleteNews } from "../controllers/news.controller";
import { requireAdmin } from "../middleware/auth.middleware";
export const newsRouter: Router = Router();
newsRouter.get("/",       getNews);
newsRouter.get("/:id",    getNewsById);
newsRouter.post("/",      requireAdmin, createNews);
newsRouter.put("/:id",    requireAdmin, updateNews);
newsRouter.delete("/:id", requireAdmin, deleteNews);

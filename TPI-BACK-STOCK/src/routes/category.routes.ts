import { Router } from "express";
import {
  createCategory,
  listCategories,
  deleteCategory,
} from "../controllers/category.controller";

export const categoryRouter = Router();

// POST /categorias
categoryRouter.post("/", createCategory);

// GET /categorias
categoryRouter.get("/", listCategories);

// DELETE /categorias/:id
categoryRouter.delete("/:id", deleteCategory);

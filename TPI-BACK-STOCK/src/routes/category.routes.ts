import { Router } from "express";
import { container } from "../container/container"

export const categoryRouter = Router();
const categoryController = container.categoryController;

// POST /categorias
categoryRouter.post("/", categoryController.createCategory);

// GET /categorias
categoryRouter.get("/", categoryController.listCategories);

// DELETE /categorias/:id
categoryRouter.delete("/:id", categoryController.deleteCategory);

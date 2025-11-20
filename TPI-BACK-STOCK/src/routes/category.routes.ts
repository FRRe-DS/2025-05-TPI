import { Router } from "express";
import { container } from "../container/container"
import { requireAnyRole } from "../middleware/requireRole";

export const categoryRouter = Router();
const categoryController = container.categoryController;


// POST /categorias
categoryRouter.post("/", 
    //requireAnyRole(["stock-be"]), 
    categoryController.createCategory
);

// GET /categorias
categoryRouter.get("/", 
    //requireAnyRole(["stock-be", "compras-be", "logistica-be"]),
    categoryController.listCategories
);

// DELETE /categorias/:id
categoryRouter.delete("/:id", 
    //requireAnyRole(["stock-be"]),
    categoryController.deleteCategory
);

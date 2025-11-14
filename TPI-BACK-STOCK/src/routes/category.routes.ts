import { Router } from "express";
import { container } from "../container/container"
import { keycloak } from "../config/keycloak";

export const categoryRouter = Router();
const categoryController = container.categoryController;


// POST /categorias
categoryRouter.post("/", 
    keycloak.protect("categorias:write"), 
    categoryController.createCategory);

// GET /categorias
categoryRouter.get("/", 
    keycloak.protect("categorias:read"),
    categoryController.listCategories);

// DELETE /categorias/:id
categoryRouter.delete("/:id", 
    keycloak.protect("categorias:write"),
    categoryController.deleteCategory);

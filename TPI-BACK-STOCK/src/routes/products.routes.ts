import { Router } from "express";
import { container } from "../container/container";
import { keycloak } from "../config/keycloak";
export const productRouter = Router();

// Crear instancia del servicio y controlador
const productController = container.productController;

// GET /v1/productos - Listar todos los productos
productRouter.get("/", 
    keycloak.protect("productos:read"), 
    productController.getAllProducts);

// POST /v1/productos - Crear un nuevo producto
productRouter.post("/", 
    keycloak.protect("productos:write"),
    productController.createProduct);

// GET /v1/productos/:productoId - Obtener un producto por ID
productRouter.get("/:productoId", 
    keycloak.protect("productos:read"),
    productController.getProductById);

// PATCH /v1/productos/:productoId - Actualizar un producto
productRouter.patch("/:productoId", 
    keycloak.protect("productos:write"),
    productController.updateProduct);

// DELETE /v1/productos/:productoId - Eliminar un producto
productRouter.delete("/:productoId", 
    keycloak.protect("productos:write"),
    productController.deleteProduct);

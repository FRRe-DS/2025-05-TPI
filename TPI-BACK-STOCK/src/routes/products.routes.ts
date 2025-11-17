import { Router } from "express";
import { container } from "../container/container";
import { keycloak } from "../config/keycloak";
import { requireRole } from "../middleware/requireRole"
//import { logisticaOStockGuard } from '../auth/authGuards';

export const productRouter = Router();

// Crear instancia del servicio y controlador
const productController = container.productController;

// GET /v1/productos - Listar todos los productos
productRouter.get("/", 
    productController.getAllProducts);

// POST /v1/productos - Crear un nuevo producto
productRouter.post("/", 
    
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

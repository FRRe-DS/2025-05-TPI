import { Router } from "express";
import { container } from "../container/container";
import { keycloak } from "../config/keycloak";
import { requireAnyRole } from "../middleware/requireRole"

export const productRouter = Router();

// Crear instancia del servicio y controlador
const productController = container.productController;

// GET /v1/productos - Listar todos los productos
productRouter.get("/", 
    //requireAnyRole(["stock-be", "compras-be", "logistica-be"]), 
    productController.getAllProducts
);

// POST /v1/productos - Crear un nuevo producto
productRouter.post("/", 
   // requireAnyRole(["stock-be"]), 
    productController.createProduct
);

// GET /v1/productos/:productoId - Obtener un producto por ID
productRouter.get("/:productoId", 
    //requireAnyRole(["stock-be", "compras-be", "logistica-be"]),
    productController.getProductById
);

// PATCH /v1/productos/:productoId - Actualizar un producto
productRouter.patch("/:productoId", 
    //requireAnyRole(["stock-be"]),
    productController.updateProduct
);

// DELETE /v1/productos/:productoId - Eliminar un producto
productRouter.delete("/:productoId", 
    //requireAnyRole(["stock-be"]),
    productController.deleteProduct
);

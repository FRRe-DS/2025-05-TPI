import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { ProductService } from "../services/productServices";

const productRouter = Router();

// Crear instancia del servicio y controlador
const productService = new ProductService();
const productController = new ProductController(productService);

// GET /v1/productos - Listar todos los productos
productRouter.get("/", productController.getAllProducts);

// POST /v1/productos - Crear un nuevo producto
productRouter.post("/", productController.createProduct);

// GET /v1/productos/:productoId - Obtener un producto por ID
productRouter.get("/:productoId", productController.getProductById);

// PATCH /v1/productos/:productoId - Actualizar un producto
productRouter.patch("/:productoId", productController.updateProduct);

// DELETE /v1/productos/:productoId - Eliminar un producto
productRouter.delete("/:productoId", productController.deleteProduct);

export default productRouter;
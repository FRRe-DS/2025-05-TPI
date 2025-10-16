import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { ProductService } from "../services/productServices";

const router = Router();

// Crear instancia del servicio y controlador
const productService = new ProductService();
const productController = new ProductController(productService);

// GET /v1/productos - Listar todos los productos
router.get("/", productController.getAllProducts);

// POST /v1/productos - Crear un nuevo producto
router.post("/", productController.createProduct);

// GET /v1/productos/:productoId - Obtener un producto por ID
router.get("/:productoId", productController.getProductById);

// PATCH /v1/productos/:productoId - Actualizar un producto
router.patch("/:productoId", productController.updateProduct);

// DELETE /v1/productos/:productoId - Eliminar un producto
router.delete("/:productoId", productController.deleteProduct);

export default router;
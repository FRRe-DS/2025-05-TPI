// src/routes/productosRoutes.ts

import { Router } from 'express';
import { container } from '../container/container';

const router = Router();

const productController = container.getProductController();

// --- DEFINICIÓN DE RUTAS ---
// 3. Usar los métodos de esa instancia del controlador
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);

export default router;
// src/routes/productosRoutes.ts
import { Router } from 'express';
import { container } from '../container/container';

const router = Router();

const productController = container.productController;

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);

export default router;
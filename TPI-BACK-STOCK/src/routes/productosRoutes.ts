import {Router} from 'express';
import {getAllProductos, getProductosById, createProducto} from '../controllers/productController'

const router = Router();

router.get('/', getAllProductos);
router.get('/:id', getProductosById);
router.post('/', createProducto)

export default router;
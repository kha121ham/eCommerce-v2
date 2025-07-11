import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductById, checkObjectId).put(protect ,admin, updateProduct, checkObjectId)
.delete(protect, admin, deleteProduct, checkObjectId);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);



export default router;
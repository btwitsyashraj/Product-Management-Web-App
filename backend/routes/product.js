const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createProduct);
router.get('/', getAllProducts);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;

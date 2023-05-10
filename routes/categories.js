const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');
const auth = require('../middleware/authentication');


router.post('/', auth, createCategory);
router.get('/', getCategories);
router.get('/:category_id', getCategoryById);
router.put('/:category_id', auth, updateCategory);
router.delete('/:category_id', auth, deleteCategory);

module.exports = router;
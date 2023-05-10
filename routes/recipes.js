const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipes');
const auth = require('../middleware/authentication');


router.post('/', auth, createRecipe);
router.get('/', getAllRecipes);
router.get('/:recipe_id', getRecipeById);
router.put('/:recipe_id', auth, updateRecipe);
router.delete('/:recipe_id', auth, deleteRecipe);

module.exports = router;
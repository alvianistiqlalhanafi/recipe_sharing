const response = require("../utils/respons");
const db = require("../config/database");

// GET ALL RECIPES
const getAllRecipes = (req, res) => {
    const sql = `SELECT * FROM recipes`;
  
    db.query(sql, (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      response(200, result, "Successfully get all recipes", res);
    });
};

// GET RECIPE BY ID
const getRecipeById = (req, res) => {
    const recipeId = req.params.recipe_id;
    const sql = `SELECT * FROM recipes WHERE recipe_id = ?`;
  
    db.query(sql, [recipeId], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.length) {
        response(200, result[0], "Successfully get recipe", res);
      } else {
        response(404, null, "Recipe not found", res);
      }
    });
};

// CREATE RECIPE
const createRecipe = async (req, res) => {
    try {
      const {
        title,
        descriptions,
        category_id,
        ingredients,
        instructions,
        cook_time,
        user_id,
      } = req.body;
  
      const sql = `INSERT INTO recipes (title, descriptions, category_id, ingredients, instructions, cook_time, user_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
      db.query(
        sql,
        [
          title,
          descriptions,
          category_id,
          ingredients,
          instructions,
          cook_time,
          user_id,
        ],
        (error, result) => {
          if (error) {
            response(400, error.name, error.message, res);
            return;
          }
          if (result.affectedRows) {
            const data = {
              isSuccess: result.affectedRows,
              recipeID: result.insertId,
            };
            response(200, data, "Successfully created recipe", res);
          }
        }
      );
    } catch (error) {
      response(400, error.name, error.message, res);
    }
};

// UPDATE RECIPE
const updateRecipe = (req, res) => {
    try {
        const recipeId = req.params.recipe_id;
        const {
            title,
            descriptions,
            category_id,
            ingredients,
            instructions,
            cook_time,
            user_id,
    } = req.body;
  
    const sql = `UPDATE recipes SET title=?, descriptions=?, category_id=?, ingredients=?, instructions=?, cook_time=?, user_id=? WHERE recipe_id=?`;
  
    db.query(
      sql,
      [
        title,
        descriptions,
        category_id,
        ingredients,
        instructions,
        cook_time,
        user_id,
        recipeId,
      ],
      (error, result) => {
        if (error) {
          response(400, error.name, error.message, res);
          return;
        }
        if (result.affectedRows) {
          const data = {
            isSuccess: result.affectedRows,
          };
          db.query(
            "SELECT * FROM recipes WHERE recipe_id = ?",
            [recipeId],
            (err, result) => {
              if (err) {
                response(500, err.name, err.message, res);
                return;
              }
              if (result.length > 0) {
                response(200, data, "success", res);
            } else {
                response(404, null, "Recipe not found", res);
            }
        });
        } else {
            response(404, null, "Recipe not found", res);
        }
    }
    );   
    } catch (error) {
        response(400, error.name, error.message, res);
    }
}

// DELETE RECIPE
const deleteRecipe = (req, res) => {
    const recipeId = req.params.recipe_id;
    const sql = "DELETE FROM recipes WHERE recipe_id=?";
    
    db.query(sql, [recipeId], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
        };
        response(200, data, "Successfully deleted recipe",res);
      } else {
        response(404, null, "Recipe not found", res);
      }
    });
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
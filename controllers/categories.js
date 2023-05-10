const response = require("../utils/respons");
const db = require("../config/database");


// GET CATEGORIES
const getCategories = (req, res) => {
    const sql = "SELECT * FROM categories";
  
    db.query(sql, (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      response(200, result, "Succesfully get all categories", res);
    });
};
  
// GET CATEGORY BY ID
const getCategoryById = (req, res) => {
    const categoryId = req.params.category_id;
    const sql = `SELECT * FROM categories WHERE category_id = ?`;
    db.query(sql, [categoryId], (error, result) => {
        if (error) {
          response(400, error.name, error.message, res);
          return;
        }
        if (result.length) {
          response(200, result[0], "Successfully get categories", res);
        } else {
          response(404, null, "Categories not found", res);
        }
      });
};
  
// CREATE CATEGORY
const createCategory = (req, res) => {
    try {
    const { nama } = req.body;
    const sql = "INSERT INTO categories(nama) VALUES(?)";
  
    db.query(sql, [nama], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
          usersID: result.insertId,
        };
        response(200, data, "Successfully created categories", res);
      }
    });
    }
    catch (error) {
        response(400, error.name, error.message, res);
    }
};
  
 // UPDATE CATEGORY
const updateCategory = (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const { nama } = req.body;
      
        const sql = "UPDATE categories SET nama=? WHERE category_id=?";
      
        db.query(sql, [nama, categoryId], (error, result) => {
          if (error) {
            response(400, error.name, error.message, res);
            return;
          }
          if (result.affectedRows) {
            const data = {
              isSuccess: result.affectedRows,
            };
            db.query(
              "SELECT * FROM categories WHERE category_id = ?", [categoryId],(err, result) => {
                if (err) {
                  response(500, err.name, err.message, res);
                  return;
                }
                if (result.length > 0) {
                    response(200, data, "Successfully updated categories", res);
                  } else {
                    response(404, null, "Categories not found", res);
                  }
                });
              } else {
                response(404, null, "Categories not found", res);
              }
            }
          );
    } catch (error) {
        response(400, error.name, error.message, res);
    }
};

// DELETE CATEGORY
const deleteCategory = (req, res) => {
    const categoryId = req.params.category_id;
    const sql = "DELETE FROM categories WHERE category_id=?";
    
    db.query(sql, [categoryId], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }
      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
        };
        response(200, data, "Successfully deleted categories",res);
      } else {
        response(404, null, "Categories not found", res);
      }
    });
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
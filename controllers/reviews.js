const response = require("../utils/respons");
const db = require("../config/database");

// CREATE REVIEW
const createReview = (req, res) => {
  try {
    const { recipe_id, user_id, rating, comment } = req.body;

    if (!recipe_id || !rating || !user_id) {
      response(400, null, "recipe_id, user_id and rating are required", res);
      return;
    }

    if (rating < 1 || rating > 5) {
      response(400, null, "Rating should be between 1 and 5", res);
      return;
    }

    const sql = `INSERT INTO reviews (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`;

    db.query(sql, [recipe_id, user_id, rating, comment], (error, result) => {
      if (error) {
        response(400, error.name, error.message, res);
        return;
      }

      if (result.affectedRows) {
        const data = {
          isSuccess: result.affectedRows,
          reviewID: result.insertId,
        };
        response(200, data, "Successfully created review", res);
      } else {
        response(400, null, "Failed to create review", res);
      }
    });
  } catch (error) {
    response(400, error.name, error.message, res);
  }
};

// DELETE REVIEW BY ID
const deleteReviewById = (req, res) => {
  const reviewId = req.params.review_id;
  const sql = "DELETE FROM reviews WHERE review_id=?";

  db.query(sql, [reviewId], (error, result) => {
    if (error) {
      response(400, error.name, error.message, res);
      return;
    }
    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, "Successfully deleted review", res);
    } else {
      response(404, null, "Review with that ID does not exist", res);
    }
    })
};

module.exports = {
    createReview,
    deleteReviewById
}
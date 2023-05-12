const express = require('express');
const router = express.Router();
const {
  createReview,
  deleteReviewById,
} = require('../controllers/reviews');
const auth = require('../middleware/authentication');


router.post('/', auth, createReview);
router.delete('/:review_id', auth, deleteReviewById);

module.exports = router;
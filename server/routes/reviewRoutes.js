const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.get('/employee/:id', reviewController.getReviewsByEmployee);
router.post('/', reviewController.addReview);
router.put('/:id', reviewController.updateReview);
router.put('/:id/respond', reviewController.respondToReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;

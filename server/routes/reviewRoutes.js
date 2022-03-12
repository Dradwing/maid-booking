const express = require("express");
const reviewRouter = express.Router({ mergeParams: true });
const reviewController = require("./../controllers/reviewController");
const customerAuthController = require("./../controllers/customerAuthController");

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(customerAuthController.protect, reviewController.createReview);

module.exports = reviewRouter;

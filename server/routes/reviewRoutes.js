const express = require("express");
const reviewRouter = express.Router({ mergeParams: true });
const reviewController = require("./../controllers/reviewController");
const customerAuthController = require("./../controllers/customerAuthController");

reviewRouter.route("/").get(reviewController.getAllReviews);
reviewRouter.use(customerAuthController.protect);
reviewRouter.route("/createReview/:maidId").post(reviewController.createReview);
reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;

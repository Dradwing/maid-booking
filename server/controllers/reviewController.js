const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      Reviews: reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.maid) req.body.maid = req.params.maidId;
  if (!req.body.customer) req.body.customer = req.Customer._id;

  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      Review: newReview,
    },
  });
});

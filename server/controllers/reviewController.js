const Review = require("./../models/reviewModel");
const Booking = require("./../models/bookingModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let reviews;
  if (req.params.maidId)
    reviews = await Review.find({ maid: req.params.maidId });
  else if (req.Customer)
    reviews = await Review.find({ customer: req.Customer._id });
  else reviews = await Review.find();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      Reviews: reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOne({
    maid: req.params.maidId,
    customer: req.Customer._id,
  });
  if (!booking)
    return next(new AppError("You can't create this review! ", 403));
  req.body.maid = req.params.maidId;
  req.body.customer = req.Customer._id;

  const newReview = await Review.create({
    ...req.body,
    maid: req.params.maidId,
    customer: req.Customer._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      Review: newReview,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      Review: review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const lastReview = await Review.findById(req.params.id);
  if (lastReview.customer != req.Customer._id)
    return next(
      new AppError("You can not update or delete this review! ", 403)
    );
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { review: req.body.review, rating: req.body.rating },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review)
    return next(new AppError("There is no review with that id! ", 404));
  res.status(200).json({
    status: "success",
    data: {
      Review: review,
    },
  });
});
exports.deleteReview = catchAsync(async (req, res, next) => {
  const lastReview = await Review.findById(req.params.id);
  if (lastReview.customer != req.Customer._id)
    return next(
      new AppError("You can not update or delete this review! ", 403)
    );
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

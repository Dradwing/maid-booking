const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      maxlength: [500, "Review is too long! "],
      required: [true, "Review can not be empty! "],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating to add a review. "],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    maid: {
      type: mongoose.Schema.ObjectId,
      ref: "Maid",
      required: [true, "Review must belong to a maid! "],
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: [true, "Review must belong to a customer! "],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: "maid",
  //     select: "name",
  //   }).populate({
  //     path: "customer",
  //     select: "name photo",
  //   });
  this.populate({
    path: "customer",
    select: "name photo",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

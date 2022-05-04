const mongoose = require("mongoose");
const Maid = require("./maidModel");

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
      default: Date.now(),
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

reviewSchema.index({ maid: 1, customer: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "name photo",
  });
  this.populate({ path: "maid", select: "name photo" });
  next();
});

//pipeline for calculating average rating whenever a new review is created
reviewSchema.statics.calAverageRatings = async function (maidId) {
  const stats = await this.aggregate([
    {
      $match: { maid: maidId },
    },
    {
      $group: {
        _id: "$maid",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Maid.findByIdAndUpdate(maidId, {
      ratingsQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating,
    });
  } else {
    await Maid.findByIdAndUpdate(maidId, {
      ratingsQuantity: 0,
      ratingAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calAverageRatings(this.maid);
});

//both findbyidAnd ==findOneAnd in back
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne().clone(); //to get the document from query as we are completing findOne
  //clone is used because mongoose v6 do not allow same query twice.
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calAverageRatings(this.r.maid);
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

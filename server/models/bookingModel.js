const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Booking must have a price! "],
  },
  paidByCustomer: {
    type: Boolean,
    default: true,
  },
  paidToMaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startingDate: {
    type: Date,
    required: [true, "Booking must have a starting date! "],
    min: [Date.now(), "Invalid starting date! "],
    max: [
      Date.now() + 24 * 60 * 60 * 1000,
      "Booking day must start in next 5 days! ",
    ],
  },
  maid: {
    type: mongoose.Schema.ObjectId,
    ref: "Maid",
    required: [true, "Booking must belong to a maid! "],
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "Booking must belong to a customer! "],
  },
});

// bookingSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "customer",
//     select: "name photo email phoneNumber address",
//   });
//   next();
// });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

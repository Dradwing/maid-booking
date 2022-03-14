const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("./../controllers/bookingController");
const customerAuthController = require("./../controllers/customerAuthController");

bookingRouter.get(
  "/checkout-session/:maidId",
  customerAuthController.protect,
  bookingController.getCheckoutSession
);
module.exports = bookingRouter;

const express = require("express");
const customerRoutes = express.Router();

const customerAuthController = require("./../controllers/customerAuthController");
const customerController = require("./../controllers/customerController");
const reviewRouter = require("./reviewRoutes");

customerRoutes.get("/images/:fileName", customerController.sendImage);
//customer authentication
customerRoutes.post("/signup", customerAuthController.signup);
customerRoutes.post("/login", customerAuthController.login);
customerRoutes.get("/logout", customerAuthController.logout);
customerRoutes.post("/forgotPassword", customerAuthController.forgotPassword);
customerRoutes.patch(
  "/resetPassword/:token",
  customerAuthController.resetPassword
);
customerRoutes.use(customerAuthController.protect);
customerRoutes.use("/reviews", reviewRouter);
customerRoutes.use("/getMaidsNearMe", customerController.getMaidsNearMe);
customerRoutes.patch("/updatePassword", customerAuthController.updatePassword);

customerRoutes.get("/myBookings", customerController.getMyBookings);
customerRoutes.get("/me", customerController.getMe);
customerRoutes.patch(
  "/updateMe",
  customerController.uploadCustomerPhoto,
  customerController.resizeCustomerPhoto,
  customerController.updateMe
);
customerRoutes.delete("/deleteMe", customerController.deleteMe);

module.exports = customerRoutes;

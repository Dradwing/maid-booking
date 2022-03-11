const express = require("express");
const customerRoutes = express.Router();

const customerAuthController = require("./../controllers/customerAuthController");
const customerController = require("./../controllers/CustomerController");

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
customerRoutes.patch("/updatePassword", customerAuthController.updatePassword);
customerRoutes.get(
  "/me",
  customerController.getMe,
  customerController.getCustomer
);
customerRoutes.patch("/updateMe", customerController.updateMe);
customerRoutes.delete("/deleteMe", customerController.deleteMe);

module.exports = customerRoutes;

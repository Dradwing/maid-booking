const express = require("express");
const customerRoutes = express.Router();

const customerAuthController = require("./../controllers/customerAuthController");
const customerController = require("./../controllers/CustomerController");

//customer authentication
customerRoutes.post("/signup", customerAuthController.signup);
customerRoutes.post("/login", customerAuthController.login);
customerRoutes.get("/logout", customerAuthController.logout);
customerRoutes.post("/forgotPassword", customerAuthController.forgotPassword);
customerRoutes.post("/resetPassword", customerAuthController.resetPassword);
customerRoutes.post("/updatePassword", customerAuthController.updatePassword);

customerRoutes.get("/allcustomers", customerController.getallcustomers);

module.exports = customerRoutes;

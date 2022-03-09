const express = require("express");
const maidRoutes = express.Router();

const maidAuthController = require("./../controllers/maidAuthController");
const maidController = require("./../controllers/maidController");

//maid authentication
maidRoutes.post("/signup", maidAuthController.signup);
maidRoutes.post("/login", maidAuthController.login);
maidRoutes.get("/logout", maidAuthController.logout);
maidRoutes.post("/forgotPassword", maidAuthController.forgotPassword);
maidRoutes.post("/resetPassword", maidAuthController.resetPassword);
maidRoutes.post("/updatePassword", maidAuthController.updatePassword);

module.exports = maidRoutes;

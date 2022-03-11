const express = require("express");
const maidRoutes = express.Router();

const maidAuthController = require("./../controllers/maidAuthController");
const maidController = require("./../controllers/maidController");

//maid authentication
maidRoutes.post("/signup", maidAuthController.signup);
maidRoutes.post("/login", maidAuthController.login);
maidRoutes.get("/logout", maidAuthController.logout);
maidRoutes.post("/forgotPassword", maidAuthController.forgotPassword);
maidRoutes.patch("/resetPassword/:token", maidAuthController.resetPassword);

// Protect all routes after this middleware
maidRoutes.use(maidAuthController.protect);

maidRoutes.patch("/updatePassword", maidAuthController.updatePassword);
maidRoutes.get("/me", maidController.getMe, maidController.getMaid);
maidRoutes.patch("/updateMe", maidController.updateMe);
maidRoutes.delete("/deleteMe", maidController.deleteMe);
//

module.exports = maidRoutes;

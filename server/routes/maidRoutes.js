const express = require("express");
const maidRoutes = express.Router();

const maidAuthController = require("./../controllers/maidAuthController");
const maidController = require("./../controllers/maidController");
const reviewRouter = require("./reviewRoutes");

maidRoutes.use("/:maidId/reviews", reviewRouter);
maidRoutes
  .route("/top-30-rated")
  .get(maidController.aliasTopMaids, maidController.getAllMaids);
//maid authentication
maidRoutes.get("/", maidController.getAllMaids);
maidRoutes.get("/maid/:id", maidController.getMaid); //careful for /me and /myWorks
maidRoutes.post("/signup", maidAuthController.signup);
maidRoutes.post("/login", maidAuthController.login);
maidRoutes.get("/logout", maidAuthController.logout);
maidRoutes.post("/forgotPassword", maidAuthController.forgotPassword);
maidRoutes.patch("/resetPassword/:token", maidAuthController.resetPassword);

// Protect all routes after this middleware
maidRoutes.use(maidAuthController.protect);

maidRoutes.patch("/updatePassword", maidAuthController.updatePassword);
maidRoutes.get("/me", maidController.getMe, maidController.getMaid);
maidRoutes.get("/myWorks", maidController.getMyWorks);
maidRoutes.patch(
  "/updateMe",
  maidController.uploadMaidPhoto,
  maidController.resizeMaidPhoto,
  maidController.updateMe
);
maidRoutes.delete("/deleteMe", maidController.deleteMe);

module.exports = maidRoutes;

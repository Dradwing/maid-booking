const express = require("express");
const app = express();

const maidRouter = require("./routes/maidRoutes");
const customerRouter = require("./routes/customerRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const bookingController = require("./controllers/bookingController");
const Email = require("./utils/email");

////security measures
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try after one hour",
});
app.use(compression());
const path = require("path");
app.use(express.static("../client/build"));

app.use("api/v1", limiter);
app.use(helmet());
//to get data of requests body and limiting it to maximum 10kb
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

////Routes middlewares
app.use("/api/v1/maids", maidRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/contactUs", async (req, res) => {
  try {
    await new Email({ email: "d", name: "d" }, "/dumy-url").sendEmailToMe(
      req.body
    );

    res.status(200).json({
      status: "success",
      message: "Message send successfully !",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: `Message could not be send ! ${err}`,
    });
  }
});

// to handle unhandled routes
app.all("*", (req, res, next) => {
  //argument in next automatically says that this is error.
  next(new AppError(`can't find ${req.originalUrl} url on this server`, 400));
});

//global errors handler
app.use(globalErrorHandler);

module.exports = app;

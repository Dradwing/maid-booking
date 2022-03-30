const express = require("express");
const app = express();

const maidRouter = require("./routes/maidRoutes");
const customerRouter = require("./routes/customerRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const bookingController = require("./controllers/bookingController");

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

app.use("api/v1", limiter);
app.use(helmet());

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);
//to get data of requests body and limiting it to maximum 10kb
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(compression());

////Routes middlewares
app.use("/api/v1/maids", maidRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// to handle unhandled routes
app.all("*", (req, res, next) => {
  //argument in next automatically says that this is error.
  next(new AppError(`can't find ${req.originalUrl} url on this server`, 400));
});

//global errors handler
app.use(globalErrorHandler);

module.exports = app;

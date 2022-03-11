const express = require("express");
const app = express();

const maidRouter = require("./routes/maidRoutes");
const customerRouter = require("./routes/customerRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

////security measures
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try after one hour",
});

app.use("api/v1/maids", limiter);
app.use("api/v1/customers", limiter);
app.use(cookieParser());

//to get data of requests body and limiting it to maximum 10kb
app.use(express.json({ limit: "10kb" }));

////Routes middlewares
app.use("/api/v1/maids", maidRouter);
app.use("/api/v1/customers", customerRouter);

// to handle unhandled routes
app.all("*", (req, res, next) => {
  //argument in next automatically says that this is error.
  next(new AppError(`can't find ${req.originalUrl} url on this server`, 400));
});

//global errors handler
app.use(globalErrorHandler);

module.exports = app;

const Customer = require("./../models/customerModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (customer, statusCode, res) => {
  const token = signToken(customer._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == "production") cookieOptions.secure = true; //for https only

  //sending as cookie so that even browser can't read/change it
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    data: { Customer: customer },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
  });
  createSendToken(newCustomer, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please fill the complete form! "));
    return;
  }
  const customer = await Customer.findOne({ email }).select("+password");
  if (
    !customer ||
    !(await customer.correctPassword(password, customer.password))
  )
    return next(new appError("Incorrect email or password! "));

  createSendToken(customer, 200, res);
});

exports.logout = (req, res, next) => {
  //just send a corrupted cookie

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true, //no need for https
  });
  res.status(200).json({ status: "success" });
};

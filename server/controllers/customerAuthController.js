const Customer = require("./../models/customerModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");

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
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    photo: req.body.photo,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
  });
  createSendToken(newCustomer, 201, res);
});

const Maid = require("./../models/maidModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (maid, statusCode, res) => {
  const token = signToken(Maid._id);
  cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    data: { Maid: maid },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newMaid = await Maid.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    photo: req.body.photo,
    mobileNumber: req.body.mobileNumber,
    aadhaarNumber: req.body.aadhaarNumber,
    address: req.body.address,
    services: req.body.services,
    price: req.body.price,
    gender: req.body.gender,
    dob: req.body.dob,
  });
  createSendToken(newMaid, 201, res);
});

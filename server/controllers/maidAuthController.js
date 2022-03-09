const Maid = require("./../models/maidModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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
    passwordConfirm: req.body.passwordConfirm,
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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please fill complete form! "));
    return;
  }

  const maid = await Maid.findOne({ email }).select("+password");

  if (!maid || !(await maid.correctPassword(password, maid.password)))
    return next(new AppError("Incorrect email or password! "));

  createSendToken(maid, 200, res);
});

exports.logout = (req, res, next) => {
  //just send a corrupted cookie

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true, //no need for https
  });
  res.status(200).json({ status: "success" });
};

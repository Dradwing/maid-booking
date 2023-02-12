const Customer = require("./../models/customerModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("./../utils/email");
const { promisify } = require("util");
const crypto = require("crypto");

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
  customer.password = undefined; //not saving though
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
    passwordConfirm: req.body.passwordConfirm,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
    location: { coordinates: req.body.location },
  });
  const url = `${req.protocol}://${req.get("host")}/customers/login`;
  await new Email(newCustomer, url).sendWelcome();
  createSendToken(newCustomer, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please fill the complete form! ", 400));
    return;
  }
  const customer = await Customer.findOne({ email }).select("+password");
  if (
    !customer ||
    !(await customer.correctPassword(password, customer.password))
  )
    return next(new AppError("Incorrect email or password! ", 404));

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    res.status(200).json({
      status: "failed",
      message: "Please fill the complete form",
    });
    return;
  }
  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer)
    return next(new AppError("There is no user with this email. ", 404));

  //generate random password reset token
  const resetToken = customer.createPasswordResetToken();
  await customer.save({ validateBeforeSave: false });

  //Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/customer/resetPassword/${resetToken}`;
    await new Email(customer, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email successfully !",
    });
  } catch (err) {
    customer.passwordResetToken = undefined;
    customer.passwordResetExpires = undefined;
    await customer.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const customer = await Customer.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!customer)
    return next(new AppError("Token is invalid or expired! ", 400));

  customer.password = req.body.password;
  customer.passwordConfirm = req.body.passwordConfirm;
  customer.passwordResetToken = undefined;
  customer.passwordResetExpires = undefined;
  await customer.save();
  createSendToken(customer, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //get user
  const customer = await Customer.findById(req.Customer._id).select(
    "+password"
  );

  //checking password
  if (!(await customer.correctPassword(req.body.password, customer.password)))
    return next(new AppError("Your current password is wrong.", 401));

  //update password
  customer.password = req.body.newPassword;
  customer.passwordConfirm = req.body.newPasswordConfirm;
  await customer.save();

  createSendToken(customer, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        "Access Denied! You do not have the permission to the requested page. \nPlease login again!",
        403
      )
    );
  }
  let decodedToken;
  decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //promisify just make the jwt.verify return promise othrwise callback;
  const currentCustomer = await Customer.findById(decodedToken.id);
  if (!currentCustomer)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist! ",
        401
      )
    );

  if (currentCustomer.changedPasswordAfter(decodedToken.iat))
    return next(
      new AppError("User changed password recently. Please login again! ", 401)
    );
  req.Customer = currentCustomer;
  next();
});

const Maid = require("./../models/maidModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (maid, statusCode, res) => {
  const token = signToken(maid._id);
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
    next(new AppError("Please fill complete form! ", 400));
    return;
  }

  const maid = await Maid.findOne({ email }).select("+password");

  if (!maid || !(await maid.correctPassword(password, maid.password)))
    return next(new AppError("Incorrect email or password! ", 404));

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const maid = await Maid.findOne({ email: req.body.email });
  if (!maid)
    return next(new AppError("There is no maid with this email. ", 404));

  //generate random password reset token
  const resetToken = maid.createPasswordResetToken();
  await maid.save({ validateBeforeSave: false });

  //Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(maid, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    maid.passwordResetToken = undefined;
    maid.passwordResetExpires = undefined;
    await maid.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync((req, res, next) => {
  //1. get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.params.token)
    .digest("hex");
  const maid = await Maid.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!maid) return next(new AppError("Token is invalid or expired! ", 400));

  maid.password = req.body.password;
  maid.passwordConfirm = req.body.passwordConfirm;
  maid.passwordResetToken = undefined;
  maid.passwordResetExpires = undefined;
  await maid.save();
  createSendToken(maid, 200, res);
});

exports.updatePassword = catchAsync((req, res, next) => {
  //get user
  const maid = await Maid.findById(req.maid.id).select("+password");

  //checking password
  if (!(await maid.correctPassword(req.body.password, maid.password)))
    return next(new AppError("Your current password is wrong.", 401));

  //update password
  maid.password = req.body.newPassword;
  maid.passwordConfirm = req.body.newPasswordConfirm;
  await maid.save();

  createSendToken(maid, 200, res);
});

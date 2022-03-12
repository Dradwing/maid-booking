const Maid = require("./../models/maidModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllMaids = catchAsync(async (req, res, next) => {
  const maids = await Maid.find();
  res.status(200).json({
    status: "success",
    Maids: maids,
  });
});
exports.getMaid = catchAsync(async (req, res, next) => {
  const maid = await Maid.findById(req.params.id).populate("reviews");
  res.status(200).json({
    status: "success",
    Maid: maid,
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.Maid.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "mobileNumber",
    "address",
    "aadhaarNumber",
    "gender",
    "price",
    "availability",
    "services",
    "dob"
  );
  const updatedMaid = await Maid.findByIdAndUpdate(req.Maid.id, filteredBody, {
    new: true, //returns new object
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    Maid: updatedMaid,
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Maid.findByIdAndUpdate(req.Maid.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

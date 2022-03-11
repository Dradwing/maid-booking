const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getMe = (req, res, next) => {
  req.params.id = req.Customer.id;
  next();
};
exports.getCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  res.status(200).json({
    status: "success",
    Customer: customer,
  });
});

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
    "address"
  );
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.Customer.id,
    filteredBody,
    {
      new: true, //returns new object
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    Customer: updatedCustomer,
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
  await Customer.findByIdAndUpdate(req.Customer.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

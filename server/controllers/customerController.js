const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const Booking = require("../models/bookingModel");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not a image! Please upload only image. ", 400));
  }
};
const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCustomerPhoto = upload.single("photo");
exports.resizeCustomerPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `customer-${req.Customer._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`Images/customers/${req.file.filename}`);
  next();
};

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

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const currentBookings = await Booking.find({
    customer: req.Customer._id,
    startingDate: { $gte: Date.now() - 30 },
  }).populate("maid");
  const pastBookings = await Booking.find({
    customer: req.Customer._id,
    startingDate: { $lt: Date.now() - 30 },
  }).populate("maids");

  res.status(200).json({
    status: "success",
    date: {
      CurrentBookings: currentBookings,
      PastBookings: pastBookings,
    },
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
  if (req.file) filteredBody.photo = req.file.filename;
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

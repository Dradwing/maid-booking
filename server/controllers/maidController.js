const Maid = require("./../models/maidModel");
const Booking = require("./../models/bookingModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const customerRoutes = require("../routes/customerRoutes");
const Review = require("../models/reviewModel");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not a image! Please upload only image. ", 400));
  }
};
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 10000000 },
});

exports.uploadMaidPhoto = upload.single("photo");
exports.resizeMaidPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `maid-${req.Maid._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`server/Images/maids/${req.file.filename}`);
  next();
};

exports.aliasTopMaids = catchAsync(async (req, res, next) => {
  req.query.limit = "6";
  req.query.sortby = "rating";
  next();
});

exports.sendImage = catchAsync(async (req, res, next) => {
  res.sendFile(
    path.resolve(`${__dirname}/../Images/maids/${req.params.fileName}`)
  );
});

exports.getAllMaids = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Maid.find(), req.query)
    .filter()
    .sorting()
    .limiting()
    .paginating();
  const maids = await features.query;
  res.status(200).json({
    status: "success",
    results: maids.length,
    data: { Maids: maids },
  });
});

exports.getMaid = catchAsync(async (req, res, next) => {
  const maid = await Maid.findById(req.params.id).populate("reviews");
  res.status(200).json({
    status: "success",
    Maid: maid,
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  const maid = await Maid.findById(req.Maid._id).populate("reviews");
  res.status(200).json({
    status: "success",
    Maid: maid,
  });
});

exports.getMyWorks = catchAsync(async (req, res, next) => {
  const currentWorks = await Booking.find({
    maid: req.Maid._id,
    startingDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  }).populate({
    path: "customer",
    select: "name photo email address mobileNumber",
  });
  const pastWorks = await Booking.find({
    maid: req.Maid._id,
    startingDate: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  }).populate({
    path: "customer",
    select: "name photo email address mobileNumber",
  });

  res.status(200).json({
    status: "success",
    data: {
      CurrentWork: currentWorks,
      PastWorks: pastWorks,
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
    "address",
    "aadhaarNumber",
    "gender",
    "price",
    "availability",
    "services",
    "dob"
  );
  if (req.file)
    filteredBody.photo = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/maids/images/${req.file.filename}`;
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

const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const multer = require("multer");
const sharp = require("sharp");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel");
const Maid = require("./../models/maidModel");
const path = require("path");

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

exports.uploadCustomerPhoto = upload.single("photo");
exports.resizeCustomerPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `customer-${req.Customer._id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`server/Images/customers/${req.file.filename}`);
  next();
};

exports.getMe = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.Customer._id);
  res.status(200).json({
    status: "success",
    Customer: customer,
  });
});
exports.getCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  res.status(200).json({
    status: "success",
    Customer: customer,
  });
});
exports.sendImage = (req, res) => {
  res.sendFile(
    path.resolve(`${__dirname}/../Images/customers/${req.params.fileName}`)
  );
};

exports.getMaidsNearMe = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Maid.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              req.Customer.location.coordinates[0],
              req.Customer.location.coordinates[1],
            ],
          },
          distanceField: "distance",
          maxDistance: 50000,
          spherical: true,
        },
      },
      {
        $match: {
          $expr: {
            $lt: [{ $floor: "$distance" }, "$radius"],
          },
        },
      },
    ]),
    req.query,
    true
  )
    .filter()
    .sorting()
    .limiting()
    .paginating(); // paginating is not working
  const maids = await features.query;

  // console.log(maidsWithinRadius[1].distanceFromCustomer);
  res.status(200).json({
    status: "success",
    results: maids.length,
    data: { Maids: maids },
  });
});
exports.getMyBookings = catchAsync(async (req, res, next) => {
  const currentBookings = await Booking.find({
    customer: req.Customer._id,
    startingDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  }).populate({ path: "maid", select: "name photo _id" });
  const pastBookings = await Booking.find({
    customer: req.Customer._id,
    startingDate: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  }).populate({ path: "maid", select: "name photo _id" });

  res.status(200).json({
    status: "success",
    data: {
      CurrentBookings: currentBookings,
      PastBookings: pastBookings,
    },
  });
});
exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    customer: req.Customer._id,
  }).populate({ path: "maid", select: "name photo _id" });
  res.status(200).json({
    status: "success",
    data: {
      reviews: reviews,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword.",
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
  if (req.file)
    filteredBody.photo = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/customers/images/${req.file.filename}`;

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

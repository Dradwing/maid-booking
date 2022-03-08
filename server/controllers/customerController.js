const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");

exports.getallcustomers = catchAsync(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json({
    status: "success",
    customers: customers,
  });
});

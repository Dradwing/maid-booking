//this file is not used anywhere
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return new AppError("No document found with that ID.", 404);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

//now require factory in any file
//expots.function=factory.deleteOne(Customer);

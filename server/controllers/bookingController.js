const Maid = require("./../models/maidModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //object

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const maid = await Maid.findById(req.params.maidId);

  //creating the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}`, //of front-end
    cancel_url: `${req.protocol}://${req.get("host")}`, //of front end
    customer_email: req.Customer.email,
    client_reference_id: req.params.maidId,
    line_items: [
      {
        name: `${maid.name}`,
        description: "Just a test payment",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-lkZGtpft_xkUlHPTRFv6hcmuvyw4IWNEZQ&usqp=CAU",
        ],
        amount: maid.price * 100,
        currency: "INR",
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

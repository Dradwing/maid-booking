const Maid = require("./../models/maidModel");
const Customer = require("./../models/customerModel");
const Booking = require("./../models/bookingModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //object

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const maid = await Maid.findById(req.params.maidId);
  const services = req.body.services;
  let price = maid.price * 100 * services.length;
  //creating the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}`, //of front-end
    cancel_url: `${req.protocol}://${req.get("host")}/maidDetails/${
      req.params.maidId
    }/`, //of front end
    customer_email: req.Customer.email,
    client_reference_id: req.params.maidId,
    metadata: {
      startingDate: req.body.startingDate,
      services: services.toString(),
    },
    line_items: [
      {
        name: `${maid.name}`,
        description: "Book maid now to ease your life.",
        images: [maid.photo],
        amount: price,
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

const createBookingCheckout = async (session) => {
  const maid = session.client_reference_id;
  const customer = (await Customer.findOne({ email: session.customer_email }))
    .id;
  const price = session.amount_total / 100;
  const startingDate = session.metadata.startingDate;
  const services = session.metadata.services.split(",");
  await Booking.create({ maid, customer, price, startingDate, services });
};
exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);
  res.status(200).json({ received: true });
};

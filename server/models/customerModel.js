const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name! "],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "There is already an account with this email"],
    lowercase: true,
  },
  location: {
    type: { type: String, default: "Point" }, // storing location of type point only
    coordinates: { type: [Number], required: true },
  },
  photo: {
    type: String,
    default:
      "https://maid-booking.onrender.com/api/v1/customers/images/defaultCustomer.jpg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password length must be more than 7"],
    maxlength: [20, "Password length must be less than 21"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  mobileNumber: {
    type: Number,
    required: [true, "Please provide your mobile number! "],
    // validate: [
    //   validator.isMobilePhone("en-IN"),
    //   "Please eneter a valid mobile number! ",
    // ],
  },
  address: {
    type: [String],
    required: [true, "Please provide your address"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

customerSchema.index({ location: "2dsphere" });

//middlewares works only when creating and saving

//1. record time of password changing
customerSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //because token get send before saving password
  next();
});

//2.encrypting password
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//3. Not considering deleted customers
customerSchema.pre(/^find/, function (next) {
  //for all queries starting with find
  //as it is a query middleware, this refers to current query
  this.find({ active: { $ne: false } }); //as default true value will not work
  next();
});
//methods on this schema
//checking password
customerSchema.methods.correctPassword = async function (
  password,
  truePassword
) {
  return await bcrypt.compare(password, truePassword);
};

//creating password reset token
customerSchema.methods.createPasswordResetToken = function () {
  //create a random token in hexadecimal string
  const resetToken = crypto.randomBytes(32).toString("hex");
  //encrypt it
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //but not saved yet
  return resetToken;
};

//to check if password was changed
customerSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

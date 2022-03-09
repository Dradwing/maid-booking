const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
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

//methods on this schema
//checking password
customerSchema.methods.correctPassword = async function (
  password,
  truePassword
) {
  return await bcrypt.compare(password, truePassword);
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

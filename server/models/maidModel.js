const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const maidSchema = new mongoose.Schema(
  {
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
      default: `https://maid-booking.onrender.com/api/v1/maids/images/defaultMaid.jpg`,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password length must be more than 7"],
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
      type: String,
      required: [true, "Please provide your mobile number! "],
      // validate: [
      //   validator.isMobilePhone(),
      //   "Please eneter a valid mobile number! ",
      // ],
    },
    address: {
      type: [String],
      required: [true, "Please provide your address"],
      trim: true,
    },
    location: {
      type: { type: String, default: "Point" }, // storing location of type point only
      coordinates: { type: [Number], required: true },
    },

    radius: { type: Number, required: true },

    dob: {
      type: Date,
      required: [true, "please provide you date of birth! "],
      min: [
        new Date(Date.now() - 60 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        "invalid date of birth",
      ],
      max: [
        new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        "invalid date of birth",
      ],
    },
    gender: {
      type: String,
      required: [true, "please provide your gender"],
      enum: ["Male", "Female", "Other"],
    },
    aadhaarNumber: {
      type: String,
      required: [true, "Please provide your aadhar card number! "],
    },

    services: [
      {
        type: String,
        enum: [
          "Cleaning",
          "Cooking",
          "Laundry",
          "Elderly Care",
          "Baby Sitting",
        ],
      },
    ],
    price: {
      type: Number,
      min: 2000,
      max: 5000,
      default: 2000,
    },

    availability: {
      type: Boolean,
      default: true,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

maidSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "maid",
  localField: "_id",
});

maidSchema.index({ location: "2dsphere" });
//middlewares works only when creating and saving

//1. record time of password changing
maidSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //because token get send before saving password
  next();
});

//2.encrypting password
maidSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//3. Not considering deleted maids
maidSchema.pre(/^find/, function (next) {
  //for all queries starting with find
  //as it is a query middleware, this refers to current query
  this.find({ active: { $ne: false } });
  next();
});

//methods on this schema
//checking password
maidSchema.methods.correctPassword = async function (password, truePassword) {
  return await bcrypt.compare(password, truePassword);
};

//creating password reset token
maidSchema.methods.createPasswordResetToken = function () {
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
maidSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const Maid = mongoose.model("Maid", maidSchema);
module.exports = Maid;

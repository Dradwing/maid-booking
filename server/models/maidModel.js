const mongoose = require("mongoose");
const validator = require("validator");

const maidSchema = new mongoose.Schema({
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
    trim: true,
  },

  dob: {
    type: Date,
    required: [true, "please provide you date of birth! "],
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
      enum: ["Cleaning", "Cooking", "Laundry", "Elderly Care", "Baby Sitting"],
    },
  ],
  price: {
    type: Number,
    min: 2000,
    max: 50000,
  },

  availability: {
    type: Boolean,
    default: true,
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
});

const Maid = mongoose.model("Maid", maidSchema);
module.exports = Maid;

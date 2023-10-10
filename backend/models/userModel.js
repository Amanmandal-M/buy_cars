const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type : String,
    },
    name: {
      type: String,
      unique: false,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: true
    },
    contactNumber: {
        type: Number,
        unique:true,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "dealer"],   
        default: "customer",         
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports.userModel = mongoose.model("User", userSchema);

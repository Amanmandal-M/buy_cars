const mongoose = require("mongoose");

const oemSpecsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameOfModel: {
      type: String,
      required: true
    },
    company_name: {
      type: String,
      required: true
    },
    yearOfModel: {
      type: Number,
      required: true
    },
    price: {
      oldPrice: {
        type: Number,
        required: true
      },
      newPrice: {
        type: Number,
        required: true
      }
    },
    colors: {
      type: Array,
      required: true
    },
    mileage: {
      type: Number,
      required: true
    },
    power_in_BHP: {
      type: Number,
      required: true
    },
    maxSpeed: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

exports.oemSpecsModel = mongoose.model("OEM_Specs", oemSpecsSchema);

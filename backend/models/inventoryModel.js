const mongoose = require("mongoose");

const marketplaceInventorySchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OEM_Specs", 
      required: true
    },
    kilometersInOdometer: {
      type: Number,
      required: true
    },
    majorScratches: {
      type: Number,
      required: true
    },
    originalPaint: {
      type: String,
      required: true
    },
    previousBuyers: {
      type: Number,
      required: true
    },
    registrationPlace: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports.marketplaceInventoryModel = mongoose.model("Marketplace_Inventory", marketplaceInventorySchema);

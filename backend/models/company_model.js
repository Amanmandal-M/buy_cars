const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    carList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OEM_Specs",
        required: true,
      }
    ],
  },
  {
    timestamps: true,
  }
);

exports.companyModel = mongoose.model("companyList", companySchema);

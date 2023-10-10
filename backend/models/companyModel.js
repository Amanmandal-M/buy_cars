const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carList: {
        type: Array,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports.companyModel = mongoose.model("companyList", companySchema);

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    producerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    bidStartDate: {
      type: Date,
      required: true,
    },
    bidEndDate: {
      type: Date,
      required: true,
    },
    noOfUnits: {
      type: Number,
      default: 1,
    },
    productType: {
      type: String,
      required: true,
      enum: ["coconut", "dryCoconut", "tenderCoconut"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);

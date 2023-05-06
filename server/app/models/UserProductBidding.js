const mongoose = require("mongoose");

const UserProductBiddingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  biddingAmount: {
    type: Number,
    required: true,
  }
},{
    timestamps: true,
});

UserProductBiddingSchema.index({userName: 1, productId: 1}, {unique: true})

module.exports = mongoose.model("userProductBidding", UserProductBiddingSchema);

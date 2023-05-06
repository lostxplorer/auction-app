const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

WalletSchema.index({userName: 1}, {unique: true})

module.exports = mongoose.model("wallets", WalletSchema);
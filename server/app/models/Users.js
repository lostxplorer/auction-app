const mongoose = require("mongoose");
const aadharValidator = require('aadhaar-validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['PRODUCER', 'CONSUMER', 'ADMIN']
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return aadharValidator.isValidNumber(v)
    //   },
    //   message: props => `${props.value} is not a valid aadhar number`
    // }
  }
}, {
  timestamps: true,
});

UserSchema.index({userName: 1}, {unique: true})

module.exports = mongoose.model("users", UserSchema);

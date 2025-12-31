// models/BlacklistedToken.js
const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 1 day auto delete
  }
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

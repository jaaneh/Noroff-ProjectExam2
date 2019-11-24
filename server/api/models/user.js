const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    signed_up: Number,
    last_login: Number
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);

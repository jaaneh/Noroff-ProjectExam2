const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Contact', contactSchema);

const mongoose = require('mongoose');

const enquiriesSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    establishment: { type: String, required: true },
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    checkin: { type: String, required: true },
    checkout: { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Enquiry', enquiriesSchema);

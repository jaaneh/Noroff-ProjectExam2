const mongoose = require('mongoose');

const establishmentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    establishmentName: { type: String, required: true },
    establishmentEmail: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    maxGuests: Number,
    googleLat: Number,
    googleLong: Number,
    description: { type: String, required: true },
    selfCatering: Boolean,
    id: Number
  },
  { versionKey: false }
);

module.exports = mongoose.model('Establishment', establishmentSchema);

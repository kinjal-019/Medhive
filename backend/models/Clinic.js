const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  phone: String,
  isOpen: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Clinic", clinicSchema);

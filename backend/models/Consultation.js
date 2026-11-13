const mongoose = require("mongoose");
const consultationSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startedAt: Date,
  endedAt: Date,
  durationMinutes: Number,
  notes: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model("Consultation", consultationSchema);

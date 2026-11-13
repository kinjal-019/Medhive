const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  scheduledAt: { type: Date, required: true },
  mode: { type: String, enum: ["in-person", "online"], default: "in-person" },
  status: { type: String, enum: ["requested", "accepted", "rejected", "cancelled", "completed"], default: "requested" },
  meetingLink: String,
  reason: String
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);

const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  position: { type: Number, required: true, min: 1 },
  patientsAhead: { type: Number, default: 0, min: 0 },
  averageConsultationMinutes: { type: Number, default: 15, min: 1 },
  expectedConsultationAt: Date,
  status: { type: String, enum: ["waiting", "in-consultation", "completed", "cancelled"], default: "waiting" }
}, { timestamps: true });

module.exports = mongoose.model("Queue", queueSchema);

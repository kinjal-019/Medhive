const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  dosage: { type: String, required: true, trim: true },
  timing: { type: String, required: true, trim: true },
  duration: { type: String, trim: true },
  instructions: { type: String, trim: true }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  diagnosis: String,
  medicines: { type: [medicineSchema], required: true },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);

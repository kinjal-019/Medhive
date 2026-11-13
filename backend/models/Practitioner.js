const mongoose = require("mongoose");

const practitionerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  practitionerType: { type: String, enum: ["MBBS", "MD", "MS", "Dentist", "Veterinary", "AYUSH"], required: true },
  specialization: { type: String, trim: true },
  registrationNumber: { type: String, required: true, trim: true },
  verificationAuthority: { type: String, enum: ["NMC", "Dental Council", "Veterinary Council", "AYUSH Council"], required: true },
  verified: { type: Boolean, default: false },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  averageConsultationMinutes: { type: Number, default: 15, min: 1 },
  available: { type: Boolean, default: false },
  consultationModes: { type: [String], enum: ["in-person", "online"], default: ["in-person"] }
}, { timestamps: true });

module.exports = mongoose.model("Practitioner", practitionerSchema);

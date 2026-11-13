const mongoose = require("mongoose");
const medicationReminderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  medicineName: { type: String, required: true },
  time: { type: String, required: true },
  frequency: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("MedicationReminder", medicationReminderSchema);

const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true }
}, { timestamps: true });
module.exports = mongoose.model("Feedback", feedbackSchema);

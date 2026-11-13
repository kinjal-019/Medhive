const mongoose = require("mongoose");
const verificationSchema = new mongoose.Schema({
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true, unique: true },
  authority: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewNote: String
}, { timestamps: true });
module.exports = mongoose.model("Verification", verificationSchema);

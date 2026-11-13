const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["appointment", "feedback", "reminder", "queue", "system"], default: "system" },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true });
module.exports = mongoose.model("Notification", notificationSchema);

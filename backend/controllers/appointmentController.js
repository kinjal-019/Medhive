const Appointment = require("../models/Appointment");
const Practitioner = require("../models/Practitioner");
const Notification = require("../models/Notification");

async function createAppointment(req, res) {
  const { practitioner, clinic, scheduledAt, mode, reason } = req.body;
  if (!practitioner || !scheduledAt) return res.status(400).json({ message: "Practitioner and scheduledAt are required" });
  const doctor = await Practitioner.findById(practitioner);
  if (!doctor || !doctor.verified) return res.status(400).json({ message: "Practitioner is not verified" });

  const appointment = await Appointment.create({
    patient: req.user.id, practitioner, clinic, scheduledAt, mode, reason
  });
  res.status(201).json(appointment);
}

async function listAppointments(req, res) {
  const filter = req.user.role === "patient" ? { patient: req.user.id } :
    req.user.role === "doctor" ? { practitioner: req.user.practitionerId } : {};
  const data = await Appointment.find(filter)
    .populate("patient", "name email phone")
    .populate({ path: "practitioner", populate: { path: "user", select: "name email" } })
    .sort({ scheduledAt: 1 });
  res.json(data);
}

async function updateAppointment(req, res) {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Appointment not found" });
  const allowed = req.user.role === "admin" ||
    (req.user.role === "patient" && appointment.patient.toString() === req.user.id) ||
    (req.user.role === "doctor" && req.user.practitionerId && appointment.practitioner.toString() === req.user.practitionerId);
  if (!allowed) return res.status(403).json({ message: "Not allowed" });

  const { status, meetingLink } = req.body;
  if (status) appointment.status = status;
  if (meetingLink !== undefined) appointment.meetingLink = meetingLink;
  await appointment.save();

  if (status === "completed") {
    await Notification.create({
      user: appointment.patient,
      type: "feedback",
      title: "Share your consultation feedback",
      message: "Your consultation is complete. Please rate your experience.",
      data: { appointmentId: appointment._id }
    });
  }
  res.json(appointment);
}

module.exports = { createAppointment, listAppointments, updateAppointment };

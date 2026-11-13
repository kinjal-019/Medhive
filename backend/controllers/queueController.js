const Queue = require("../models/Queue");
const Practitioner = require("../models/Practitioner");
const Appointment = require("../models/Appointment");
const { calculateExpectedConsultationTime } = require("../utils/calculateQueueTime");

async function createQueueEntry(req, res) {
  const appointment = await Appointment.findById(req.body.appointment);
  if (!appointment) return res.status(404).json({ message: "Appointment not found" });
  const practitioner = await Practitioner.findById(appointment.practitioner);
  if (!practitioner) return res.status(404).json({ message: "Practitioner not found" });

  const patientsAhead = Number(req.body.patientsAhead || 0);
  const average = Number(req.body.averageConsultationMinutes || practitioner.averageConsultationMinutes || 15);
  const expected = calculateExpectedConsultationTime(new Date(), patientsAhead, average);

  const entry = await Queue.findOneAndUpdate(
    { appointment: appointment._id },
    { appointment: appointment._id, practitioner: practitioner._id, position: patientsAhead + 1, patientsAhead, averageConsultationMinutes: average, expectedConsultationAt: expected, status: "waiting" },
    { new: true, upsert: true }
  );
  res.status(201).json(entry);
}

async function getMyQueue(req, res) {
  const data = await Queue.find()
    .populate({ path: "appointment", match: { patient: req.user.id }, populate: { path: "practitioner" } })
    .sort({ position: 1 });
  res.json(data.filter(q => q.appointment));
}

module.exports = { createQueueEntry, getMyQueue };

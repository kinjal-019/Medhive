const Prescription = require("../models/Prescription");
const Practitioner = require("../models/Practitioner");

async function createPrescription(req, res) {
  const practitioner = await Practitioner.findOne({ user: req.user.id });
  if (!practitioner) return res.status(404).json({ message: "Practitioner profile not found" });
  const { patient, appointment, diagnosis, medicines, notes } = req.body;
  if (!patient || !Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({ message: "Patient and at least one medicine are required" });
  }
  const prescription = await Prescription.create({ patient, practitioner: practitioner._id, appointment, diagnosis, medicines, notes });
  res.status(201).json(prescription);
}

async function listPrescriptions(req, res) {
  const filter = req.user.role === "patient" ? { patient: req.user.id } : {};
  if (req.user.role === "doctor") {
    const practitioner = await Practitioner.findOne({ user: req.user.id });
    if (!practitioner) return res.status(404).json({ message: "Practitioner profile not found" });
    filter.practitioner = practitioner._id;
  }
  const data = await Prescription.find(filter)
    .populate("patient", "name email")
    .populate({ path: "practitioner", populate: { path: "user", select: "name email" } })
    .sort({ createdAt: -1 });
  res.json(data);
}

module.exports = { createPrescription, listPrescriptions };

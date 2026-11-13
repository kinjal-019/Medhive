const Feedback = require("../models/Feedback");
async function createFeedback(req,res) {
  const { appointment, practitioner, rating, comment } = req.body;
  if (!appointment || !practitioner || !rating) return res.status(400).json({message:"Appointment, practitioner and rating are required"});
  const exists = await Feedback.findOne({appointment});
  if (exists) return res.status(409).json({message:"Feedback already submitted"});
  res.status(201).json(await Feedback.create({appointment, patient:req.user.id, practitioner, rating, comment}));
}
async function listFeedback(req,res) {
  const filter = req.user.role === "patient" ? {patient:req.user.id} : {};
  res.json(await Feedback.find(filter).populate("patient","name").sort({createdAt:-1}));
}
module.exports={createFeedback,listFeedback};

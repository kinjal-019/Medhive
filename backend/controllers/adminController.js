const User=require("../models/User");
const Appointment=require("../models/Appointment");
const Practitioner=require("../models/Practitioner");
const Verification=require("../models/Verification");
async function stats(req,res){const [patients,doctors,appointments,pending]=await Promise.all([User.countDocuments({role:"patient"}),User.countDocuments({role:"doctor"}),Appointment.countDocuments(),Verification.countDocuments({status:"pending"})]);res.json({patients,doctors,appointments,pendingVerifications:pending});}
async function users(req,res){res.json(await User.find().select("-password").sort({createdAt:-1}));}
async function verifications(req,res){res.json(await Verification.find().populate({path:"practitioner",populate:{path:"user",select:"name email"}}).sort({createdAt:-1}));}
async function reviewVerification(req,res){const v=await Verification.findById(req.params.id);if(!v)return res.status(404).json({message:"Verification not found"});v.status=req.body.status;v.reviewNote=req.body.reviewNote;v.reviewedBy=req.user.id;await v.save();await Practitioner.findByIdAndUpdate(v.practitioner,{verified:v.status==="approved"});res.json(v);}
module.exports={stats,users,verifications,reviewVerification};

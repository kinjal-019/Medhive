const Practitioner=require("../models/Practitioner");
const User=require("../models/User");
const Verification=require("../models/Verification");
async function createProfile(req,res){
 const existing=await Practitioner.findOne({user:req.user.id}); if(existing)return res.status(409).json({message:"Practitioner profile already exists"});
 const {practitionerType,specialization,registrationNumber,verificationAuthority,consultationModes}=req.body;
 const p=await Practitioner.create({user:req.user.id,practitionerType,specialization,registrationNumber,verificationAuthority,consultationModes});
 await Verification.create({practitioner:p._id,authority:verificationAuthority,registrationNumber});
 res.status(201).json(p);
}
async function myProfile(req,res){res.json(await Practitioner.findOne({user:req.user.id}).populate("user","name email phone"));}
async function search(req,res){const q=req.query.q||""; const data=await Practitioner.find({verified:true,$or:[{specialization:{$regex:q,$options:"i"}},{practitionerType:{$regex:q,$options:"i"}}]}).populate("user","name email phone"); res.json(data);}
async function updateAvailability(req,res){const p=await Practitioner.findOneAndUpdate({user:req.user.id},{available:Boolean(req.body.available)},{new:true}); if(!p)return res.status(404).json({message:"Practitioner profile not found"}); res.json(p);}
module.exports={createProfile,myProfile,search,updateAvailability};

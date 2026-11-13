const Consultation=require("../models/Consultation");
const Appointment=require("../models/Appointment");
async function complete(req,res){
 const appointment=await Appointment.findById(req.params.appointmentId);
 if(!appointment)return res.status(404).json({message:"Appointment not found"});
 if(req.user.role==="doctor" && (!req.user.practitionerId || appointment.practitioner.toString()!==req.user.practitionerId))return res.status(403).json({message:"Not allowed"});
 const startedAt=req.body.startedAt?new Date(req.body.startedAt):new Date();
 const endedAt=req.body.endedAt?new Date(req.body.endedAt):new Date();
 const durationMinutes=Math.max(0,Math.round((endedAt-startedAt)/60000));
 const c=await Consultation.findOneAndUpdate({appointment:appointment._id},{appointment:appointment._id,practitioner:appointment.practitioner,patient:appointment.patient,startedAt,endedAt,durationMinutes,notes:req.body.notes,completed:true},{new:true,upsert:true});
 appointment.status="completed"; await appointment.save(); res.json(c);
}
async function list(req,res){const filter=req.user.role==="patient"?{patient:req.user.id}:{}; res.json(await Consultation.find(filter).sort({createdAt:-1}));}
module.exports={complete,list};

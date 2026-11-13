const Notification = require("../models/Notification");
async function listNotifications(req,res){res.json(await Notification.find({user:req.user.id}).sort({createdAt:-1}).limit(50));}
async function markRead(req,res){const n=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user.id},{read:true},{new:true}); if(!n)return res.status(404).json({message:"Notification not found"}); res.json(n);}
module.exports={listNotifications,markRead};

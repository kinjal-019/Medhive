const User=require("../models/User");
async function profile(req,res){res.json(await User.findById(req.user.id).select("-password"));}
async function updateProfile(req,res){const allowed=["name","phone"]; const data={}; for(const k of allowed) if(req.body[k]!==undefined)data[k]=req.body[k]; res.json(await User.findByIdAndUpdate(req.user.id,data,{new:true}).select("-password"));}
module.exports={profile,updateProfile};

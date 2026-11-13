const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const protect=require("./middleware/authMiddleware");
const Practitioner=require("./models/Practitioner");
const authRoutes=require("./routes/authRoutes");
const appointmentRoutes=require("./routes/appointmentRoutes");
const prescriptionRoutes=require("./routes/prescriptionRoutes");
const queueRoutes=require("./routes/queueRoutes");
const feedbackRoutes=require("./routes/feedbackRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const patientRoutes=require("./routes/patientRoutes");
const practitionerRoutes=require("./routes/practitionerRoutes");
const consultationRoutes=require("./routes/consultationRoutes");
const adminRoutes=require("./routes/adminRoutes");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config();
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));
app.use(express.json({limit:"1mb"}));

app.get("/",(req,res)=>res.json({message:"MedHive API is running",version:"1.0.0"}));
app.get("/api/health",(req,res)=>res.json({status:"ok",service:"medhive-api",timestamp:new Date().toISOString()}));
app.use("/api/auth",authRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/prescriptions",prescriptionRoutes);
app.use("/api/queue",queueRoutes);
app.use("/api/feedback",feedbackRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/patients",patientRoutes);
app.use("/api/practitioners",practitionerRoutes);
app.use("/api/consultations",consultationRoutes);
app.use("/api/admin",adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function start(){
 await connectDB();
 // Resolve practitioner's profile id onto the authenticated request for doctor routes.
 app.use((req,res,next)=>next());
 const port=process.env.PORT||5000;
 return app.listen(port,()=>console.log(`MedHive backend running on port ${port}`));
}
if(require.main===module) start().catch(err=>{console.error(err);process.exit(1);});
module.exports={app,start};

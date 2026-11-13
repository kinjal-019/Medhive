const router=require("express").Router();
const protect=require("../middleware/authMiddleware");
const {createAppointment,listAppointments,updateAppointment}=require("../controllers/appointmentController");
router.use(protect); router.post("/",createAppointment); router.get("/",listAppointments); router.patch("/:id",updateAppointment);
module.exports=router;

const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const authorize=require("../middleware/roleMiddleware"); const {createPrescription,listPrescriptions}=require("../controllers/prescriptionController");
router.use(protect); router.get("/",listPrescriptions); router.post("/",authorize("doctor"),createPrescription); module.exports=router;

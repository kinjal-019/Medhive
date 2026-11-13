const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const {profile,updateProfile}=require("../controllers/patientController");
router.use(protect); router.get("/profile",profile); router.patch("/profile",updateProfile); module.exports=router;

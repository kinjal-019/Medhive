const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const authorize=require("../middleware/roleMiddleware"); const {complete,list}=require("../controllers/consultationController");
router.use(protect); router.get("/",list); router.post("/:appointmentId/complete",authorize("doctor"),complete); module.exports=router;

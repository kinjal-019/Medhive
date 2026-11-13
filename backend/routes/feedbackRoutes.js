const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const {createFeedback,listFeedback}=require("../controllers/feedbackController");
router.use(protect); router.post("/",createFeedback); router.get("/",listFeedback); module.exports=router;

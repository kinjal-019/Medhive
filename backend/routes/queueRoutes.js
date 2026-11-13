const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const authorize=require("../middleware/roleMiddleware"); const {createQueueEntry,getMyQueue}=require("../controllers/queueController");
router.use(protect); router.get("/mine",authorize("patient"),getMyQueue); router.post("/",authorize("doctor","admin"),createQueueEntry); module.exports=router;

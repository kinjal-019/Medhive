const router=require("express").Router(); const protect=require("../middleware/authMiddleware"); const {listNotifications,markRead}=require("../controllers/notificationController");
router.use(protect); router.get("/",listNotifications); router.patch("/:id/read",markRead); module.exports=router;

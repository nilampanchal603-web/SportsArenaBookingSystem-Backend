const sessionController=require("../controllers/MySessionController")
const router=require("express").Router()
router.post("/newsession",sessionController.createSession)
router.get("/allsession",sessionController.getAllSession)
router.delete("/deletesession/:id",sessionController.deleteSession)
module.exports=router
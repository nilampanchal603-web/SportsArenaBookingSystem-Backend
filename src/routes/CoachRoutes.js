const coachController=require("../controllers/CoachController")
const router=require("express").Router()

router.post("/newcoach",coachController.newCoach);
router.get("/dashboard",coachController.getCoachDashboard);
router.get("/allcoach",coachController.getAllCoach);
router.delete("/deletecoach/:id",coachController.deleteCoach);
router.put("/updatecoach/:id",coachController.updateCoach);

module.exports=router
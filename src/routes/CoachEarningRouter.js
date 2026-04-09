const earningController=require("../controllers/CoachEarningController")
const router = require("express").Router();
router.get("/allearnings",earningController.getAllEarnings);
router.post("/earnings",earningController.addEarning);
router.delete("/deleteearnings/:id",earningController.deleteEarning);
router.put("/updateearnings/:id",earningController.updateEarning);
module.exports = router;

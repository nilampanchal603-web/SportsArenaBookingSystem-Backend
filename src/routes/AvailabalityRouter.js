const avalibalityController=require("../controllers/AvalibalityController")
const router=require("express").Router()
router.post("/addavailability",avalibalityController.newAvailability)
router.get("/allavailability",avalibalityController.getAllAvailability)
router.put("/updateavailability/:id",avalibalityController.updateAvailability)
router.delete("/deleteavailability/:id",avalibalityController.deleteAvailability)

module.exports = router

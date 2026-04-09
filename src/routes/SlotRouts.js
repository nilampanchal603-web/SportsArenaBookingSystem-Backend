const slotController=require("../controllers/SlotController")
const express = require("express");
const router=express.Router()
const { validateToken, authorizeRoles } = require("../middleware/AuthMiddleware");

router.post("/addslot",slotController.createSlot);
router.get("/allslot",slotController.getAllSlot);
router.get("/:id",slotController.getSlotById);
router.delete("/deleteslot/:id",slotController.deleteSlot);
router.put("/updateslot/:id",slotController.updateSlot);
router.get("/arena/:arenaId", validateToken, slotController.getSlotsByArena);

module.exports=router
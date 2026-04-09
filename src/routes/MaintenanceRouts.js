const maintenanceController=require("../controllers/MaintenanceController")
 
const router=require("express").Router()
router.post("/createmaintenance",maintenanceController.createMaintenance);
router.get("/allmaintenance",maintenanceController.getAllMaintenance);
router.delete("/deletemaintenance/:id",maintenanceController.deleteMaintenance);
router.put("/updatemaintenance/:id",maintenanceController.updateMaintenance);

module.exports=router
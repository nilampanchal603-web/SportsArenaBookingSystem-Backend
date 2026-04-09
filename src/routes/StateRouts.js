const stateController=require("../controllers/StateController")
 
const router=require("express").Router()
router.post("/createstate",stateController.createState);
router.get("/allstate",stateController.getAllState);
router.delete("/deletestate/:id",stateController.deleteState);
router.put("/updatestate/:id",stateController.updateState);

module.exports=router
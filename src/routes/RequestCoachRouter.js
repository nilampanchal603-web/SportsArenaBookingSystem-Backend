const requestController=require("../controllers/RequestCoachCotnroller")
const router=require("express").Router()

router.post("/newrequest",requestController.newRequest)
router.get("/allrequest",requestController.getAllRequest)
router.put("/updaterequest/:id",requestController.updateRequest)

module.exports=router

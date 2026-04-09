const feedbackController=require("../controllers/FeedbackController")
const router=require("express").Router()

router.post("/newfeedback",feedbackController.createFeedback);
router.get("/allfeedback",feedbackController.getAllFeedback);
router.delete("/deletefeedback/:id",feedbackController.deleteFeedback);
router.put("/updatefeedback/:id",feedbackController.updateFeedback);

module.exports=router
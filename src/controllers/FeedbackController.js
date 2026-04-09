const feedbackSchema=require("../models/FeedbackModel")

const createFeedback = async (req,res)=>{
    try{

        const saveFeedback = await feedbackSchema.create(req.body)

        res.status(201).json({
            message:"Feedback created successfully",
            data:saveFeedback
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating feedback",
            err:error
        })
    }
};
const getAllFeedback = async (req,res)=>{
    try{

        const allFeedback = await feedbackSchema.find().populate("userId","firstName lastName").populate("arenaId","arenaName").populate("coachId","coachName")
        res.status(200).json({
            message:"All feedback fetched",
            data:allFeedback
        })

    }catch(error){
        res.status(500).json({
            message:"Error while getting feedback",
            err:error
        })
    }
};

 const updateFeedback = async (req,res)=>{
    try{

        const updateFeedbackObj = await feedbackSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Feedback updated successfully",
            data:updateFeedbackObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating feedback",
            err:error
        })
    }
};
const deleteFeedback = async (req,res)=>{
    try{

        const deleteFeedbackObj = await feedbackSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Feedback deleted successfully",
            data:deleteFeedbackObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting feedback",
            err:error
        })
    }
};
module.exports = {createFeedback, getAllFeedback,updateFeedback,deleteFeedback}

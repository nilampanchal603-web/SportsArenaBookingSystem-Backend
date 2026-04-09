 const requestSchema=require("../models/RequestCoachModel")


  const newRequest=async(req,res)=>{
    try {
        const saveRequest=await requestSchema.create(req.body)
        res.status(201).json({
            message:"Request created successfully",
            data:saveRequest
        })
        
    } catch (error) {
        res.status(500).json({
             message:"Error creating request",
            err:error

        })
        
    }
 };
  

 const getAllRequest=async(req,res)=>{
    try {
        const allRequest=await requestSchema.find().populate("coachId")
        res.status(200).json({
            message:"All requests fetched successfully",
            data:allRequest
        })
        
    } catch (error) {
        res.status(500).json({
             message:"Error while getting requests",
            err:error

        })
        
    }
 };
 const updateRequest=async(req,res)=>{
    try {
        const updateRequestObj=await requestSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true });
         if (!updateRequestObj) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Request updated successfully",
      data:updateRequestObj
    })
    } catch (error) {
        res.status(500).json({
      message: "Error while updating request",
      err: error
        })
        
    }
 }
 module.exports = { getAllRequest, updateRequest,newRequest }
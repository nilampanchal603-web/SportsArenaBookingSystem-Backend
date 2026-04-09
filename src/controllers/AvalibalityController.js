const availabilitySchema=require("../models/AvalibalityModel")


const newAvailability = async (req,res)=>{
    try{

        const saveAvailability = await availabilitySchema.create(req.body)

        res.status(201).json({
            message:"Availability created successfully",
            data:saveAvailability
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating availability",
            err:error
        })
    }
};
const getAllAvailability = async (req,res)=>{
    try{

        const allAvailability = await availabilitySchema.find().populate("coachId")

        res.status(200).json({
            message:"All availability fetched",
            data:allAvailability
        })

    }catch(error){
        res.status(500).json({
            message:"Error while getting availability",
            err:error
        })
    }
};
const updateAvailability = async (req,res)=>{
    try{

        const updateAvailabilityObj = await availabilitySchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Availability updated successfully",
            data:updateAvailabilityObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating availability",
            err:error
        })
    }
};
const deleteAvailability = async (req,res)=>{
    try{

        const deleteAvailabilityObj = await availabilitySchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Availability deleted successfully",
            data:deleteAvailabilityObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting availability",
            err:error
        })
    }
};
module.exports = {newAvailability,getAllAvailability,updateAvailability,deleteAvailability}
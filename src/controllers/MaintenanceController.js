const maintenanceSchema=require("../models/MaintenanceModel")

const createMaintenance = async (req,res)=>{
    try{
        const saveMaintenance = await maintenanceSchema.create(req.body)

        res.status(201).json({
            message:"Maintenance created successfully",
            data:saveMaintenance
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating maintenance",
            err:error
        })
    }
};
const getAllMaintenance = async (req,res)=>{
    try{

        const allMaintenance = await maintenanceSchema.find().populate("arenaId")

        res.status(200).json({
            message:"All maintenance records fetched",
            data:allMaintenance
        })

    }catch(error){
        res.status(500).json({
            message:"Error while getting maintenance",
            err:error
        })
    }
};
const updateMaintenance = async (req,res)=>{
    try{

        const updateMaintenanceObj = await maintenanceSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Maintenance updated successfully",
            data:updateMaintenanceObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating maintenance",
            err:error
        })
    }
};
const deleteMaintenance = async (req,res)=>{
    try{

        const deleteMaintenanceObj = await maintenanceSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Maintenance deleted successfully",
            data:deleteMaintenanceObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting maintenance",
            err:error
        })
    }
};
module.exports = {createMaintenance,getAllMaintenance,updateMaintenance, deleteMaintenance}
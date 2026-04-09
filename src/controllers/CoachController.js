const coachSchema=require("../models/CoachModel")
const sessionSchema = require("../models/MySessionModel")
const requestSchema = require("../models/RequestCoachModel")
const earningSchema = require("../models/CoachEacringModel")

const getCoachDashboard = async (req, res) => {
    try {
        // In a real app, you would filter by the logged-in coach's ID.
        // For now, since the models don't easily link User to Coach yet, we just aggregate all or a subset to show dynamic data.
        const totalSessions = await sessionSchema.countDocuments()
        const pendingRequests = await requestSchema.countDocuments({ status: "Pending" })
        const totalEarningsDoc = await earningSchema.aggregate([
            { $group: { _id: null, total: { $sum: "$fee" } } }
        ])
        const totalEarnings = totalEarningsDoc.length > 0 ? totalEarningsDoc[0].total : 0

        res.status(200).json({
            message: "Coach dashboard fetched",
            data: { totalSessions, pendingRequests, totalEarnings }
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching coach dashboard", err: error })
    }
}

const newCoach = async (req,res)=>{
    try{

        const saveCoach = await coachSchema.create(req.body)

        res.status(201).json({
            message:"Coach created successfully",
            data:saveCoach
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating coach",
            err:error
        })
    }
};
  const getAllCoach = async (req,res)=>{
    try{

        const allCoach = await coachSchema.find()

        res.status(200).json({
            message:"All coaches fetched",
            data:allCoach
        })

    }catch(error){
        res.status(500).json({
            message:"Error while getting coaches",
            err:error
        })
    }
};
const updateCoach = async (req,res)=>{
    try{

        const updateCoachObj = await coachSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Coach updated successfully",
            data:updateCoachObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating coach",
            err:error
        })
    }
};
const deleteCoach = async (req,res)=>{
    try{

        const deleteCoachObj = await coachSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Coach deleted successfully",
            data:deleteCoachObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting coach",
            err:error
        })
    }
};
module.exports = {newCoach,getAllCoach,updateCoach,deleteCoach,getCoachDashboard}




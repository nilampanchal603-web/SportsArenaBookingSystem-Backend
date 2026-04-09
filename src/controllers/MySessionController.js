const sessionSchema=require("../models/MySessionModel")
const earningSchema=require("../models/CoachEacringModel")


const createSession=async(req,res)=>{
    try {
        const newSession=await sessionSchema.create(req.body)
        
        if (req.body.coachId) {
            await earningSchema.create({
                coachId: req.body.coachId,
                sessionId: newSession._id,
                date: newSession.date,
                fee: 500,
                status: "Pending"
            });
        }

        res.status(201).json({
            message:"Add new session successfully",
            data:newSession
        })
    } catch (error) {
        res.status(500).json({
            message:"Error While session craeted",
            err:error
        })
    }
}

const getAllSession=async(req,res)=>{
    try {
        const allSession=await sessionSchema.find().populate("arenaId")
        res.status(200).json({
            message:"All session fetched",
            data:allSession
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error While fetching Session",
            err:error
        })
        
    }

};
const deleteSession=async(req,res)=>{
    try {
          const deletedSessionObj=await sessionSchema.findByIdAndDelete(req.params.id)
          res.status(200).json({
            message:"Delete session successfully",
            data:deletedSessionObj
        })
    } catch (error) {
        res.status(500).json({
            message:"Delete session successfully",
            err:error
        })
        
    }
}
module.exports={getAllSession,deleteSession,createSession}

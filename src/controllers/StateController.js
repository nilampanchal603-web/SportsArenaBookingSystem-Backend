const stateSchema=require("../models/StateModel")

const createState=async (req,res)=>{
  try{
    const saveState=await stateSchema.create(req.body)
    res.status(201).json({
        message:"state created successfully",
        data:saveState
    })
  }catch(error){
     res.status(500).json({
        message:"Error while creating state",
      err:error
    })
}  
};
const getAllState=async (req,res)=>{
  try{
    const allState=await stateSchema.find()
    res.status(200).json({
        message:"All states fetched",
        data:allState
    })
  }catch(error){
     res.status(500).json({
        message:"All states fetched",
      err:error
    })
}  
};
const deleteState=async(req,res)=>{
    try{
     const deleteUserObj=await stateSchema.findByIdAndDelete(req.params.id)
     res.status(200).json({
        message:"State deleted successfully",
        data:deleteUserObj
     })
    }catch(error){
         res.status(500).json({
        message:"Error while deleting state",
        data:error
     })
    }
};
const updateState=async(req,res)=>{
    try{
     const updateUserObj=await stateSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
     res.status(200).json({
        message:"State updated successfully",
        data:updateUserObj
     })
    }catch(error){
         res.status(500).json({
        message:"Error while updating state",
        data:error
     })
    }
};

module.exports={
    createState,getAllState,deleteState,updateState
}
const arenaSchema=require("../models/ArenaModel")
const uploadToCloudinary=require("../utils/CloudinaryUtil")

const newArena = async (req,res)=>{
    // const cloudinaryResponse=await uploadToCloudinary(req.file.path)
    try{
         console.log("USER DATA:", req.user);
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

    let imageUrls = [];

    // ✅ multiple images upload
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const cloudinaryResponse = await uploadToCloudinary(file.path);
        imageUrls.push(cloudinaryResponse.secure_url);
      }
    }
    
      // const saveArena = await arenaSchema.create({...req.body,imagePath:req.file.path})
        const saveArena = await arenaSchema.create({...req.body, managerId: req.user?.id || req.user?._id,imagePath: imageUrls})
        console.log(req.body)
        res.status(201).json({
            message:"Arena created successfully",
            data:saveArena
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error while creating arena",
            err:error.message
        })
    }
};
const getAllArena = async (req,res)=>{
    try{

        const allArena = await arenaSchema.find().populate("stateId").populate("cityId").populate("managerId")
         res.status(200).json({
            message:"All arenas fetched",
            data:allArena
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error while getting arenas",
            err:error
        })
    }
};
const getArenaById = async (req, res) => {
  try {
    const arena = await arenaSchema
      .findById(req.params.id)
      .populate("stateId")
      .populate("cityId")
      .populate("managerId");

    if (!arena) {
      return res.status(404).json({ message: "Arena not found" });
    }

    res.status(200).json({ message: "Arena fetched", data: arena });
  } catch (error) {
    console.log("Error fetching arena:", error);
    res.status(500).json({ message: "Error while fetching arena", err: error.message });
  }
};

const updateArena = async (req,res)=>{
    try{

        const updateArenaObj = await arenaSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Arena updated successfully",
            data:updateArenaObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating arena",
            err:error
        })
    }
};
const deleteArena = async (req,res)=>{
    try{

        const deleteArenaObj = await arenaSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Arena deleted successfully",
            data:deleteArenaObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting arena",
            err:error
        })
    }
};

 

module.exports = {newArena,getAllArena ,getArenaById,updateArena,deleteArena,}






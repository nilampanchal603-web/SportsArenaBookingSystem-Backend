const productSchema=require("../models/ProductModel")
const uplaodToCloudinary=require("../utils/CloudinaryUtil")
const creatProduct=async(req,res)=>{
    try {
        //to access file path
        // console.log(req.file)
        // const saveProduct=await productSchema.create(req.body)
        // const saveProduct=await productSchema.create({...req.body,imagePath:req.file.path})
        const cloudinaryResponse=await uplaodToCloudinary(req.file.path)
        console.log("cloudinary Response",cloudinaryResponse)//secure_url
         const saveProduct=await productSchema.create({...req.body,imagePath:cloudinaryResponse.secure_url})
        res.status(201).json({
            message:" Product Created Successfully",
            data:saveProduct
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:" Error While creating Product "
        })
        
    }
    
};
const getAllProduct=async(req,res)=>{
    try {
        const allProduct=await productSchema.find().populate("categoryId")
        res.status(200).json({
            message:" Product fetching Successfully",
            data:allProduct
        })
        
    } catch (error) {
        res.status(500).json({
            message:" Error While fetching Product "
        })
        
    }
    
}
module.exports={creatProduct,getAllProduct}
const categorySchema=require("../models/CategoryModel")
const creatCategory=async(req,res)=>{
    try {
        const saveCategory=await categorySchema.create(req.body)
        res.status(201).json({
            message:" Category Created Successfully",
            data:saveCategory
        })
        
    } catch (error) {
        res.status(500).json({
            message:" Error While creating Category"
        })
        
    }
    
};
const getAllCategory=async(req,res)=>{
    try {
        const allCategory=await categorySchema.find({status:"Active"})
        res.status(200).json({
            message:" Product fetching Successfully",
            data:allCategory
        })
        
    } catch (error) {
        res.status(500).json({
            message:" Error While  fetching  category"
        })
        
    }
    
}
module.exports={getAllCategory,creatCategory}
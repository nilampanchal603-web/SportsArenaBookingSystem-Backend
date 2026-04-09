const categoryController=require("../controllers/CategoryController")

const router=require("express").Router()
router.post("/category",categoryController.creatCategory)
router.get("/allcategory",categoryController.getAllCategory)

module.exports=router
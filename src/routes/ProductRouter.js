const productController=require("../controllers/ProductController")
const router=require("express").Router()
const testMiddleware=require("../middleware/TestMiddleware")
const upload=require("../middleware/UploadMiddleware")
const { validateToken } = require("../middleware/AuthMiddleware")
router.post("/product",upload.single("image"),productController.creatProduct)
router.get("/allproduct", validateToken,productController.getAllProduct)

module.exports=router
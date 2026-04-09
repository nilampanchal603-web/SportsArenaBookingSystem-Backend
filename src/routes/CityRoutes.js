const cityController=require("../controllers/CityController")
const router=require("express").Router()
router.post("/newcity",cityController.addCity)
router.get("/allcity",cityController.getAllCities)
router.delete("/deletecity/:id",cityController.deleteCity)
router.put("/updatecity/:id",cityController.updateCity)
module.exports=router

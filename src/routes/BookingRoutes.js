const bookingController=require("../controllers/BookingController")
const router=require("express").Router()

router.post("/newbooking",bookingController.newBooking);
router.get("/allbooking",bookingController.getAllBooking);
router.delete("/deletebooking/:id",bookingController.deleteBooking);
router.put("/updatebooking/:id",bookingController.updateBooking);

module.exports=router
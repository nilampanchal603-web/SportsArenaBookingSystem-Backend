const paymentController=require("../controllers/PaymentController")
 
const router=require("express").Router()
router.post("/newpayment",paymentController.newPayment);
router.get("/allpayment",paymentController.getAllPayments);
router.delete("/deletepayment/:id",paymentController.deletePayment);
router.put("/updatepayment/:id",paymentController.updatePayment);

// Razorpay Routes
router.post("/create-order",paymentController.createOrder);
router.post("/verify-payment",paymentController.verifyPayment);

module.exports=router
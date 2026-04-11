const paymentSchema =require("../models/PaymentModel")
const bookingSchema =require("../models/BookingModel")
const Razorpay = require("razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${bookingId}`,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json({ data: order, message: "Order created successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error while creating order", err: error });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingId,
            userId,
            amount
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is successful
            const savePayment = await paymentSchema.create({
                userId,
                bookingId,
                transactionId: razorpay_payment_id,
                paymentMode: "NetBanking", // Or UPI/Card which we can generalize
                paymentStatus: "success",
            });

            // Update booking payment status to paid
            await bookingSchema.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });

            res.status(200).json({ message: "Payment verified successfully", data: savePayment });
        } else {
            // Payment is failed due to invalid signature
            const savePayment = await paymentSchema.create({
                userId,
                bookingId,
                transactionId: razorpay_order_id, // Save order ID
                paymentMode: "NetBanking",
                paymentStatus: "failed",
            });
            res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Error while verifying payment", err: error });
    }
};

const newPayment = async (req,res)=>{
    try{

        const savePayment = await paymentSchema.create(req.body)

        res.status(201).json({
            message:"Payment created successfully",
            data:savePayment
        })

    }catch(error){
        res.status(500).json({
            message:"Error while creating payment",
            err:error
        })
    }
};
const getAllPayments = async (req,res)=>{
    try{

        const allPayments = await paymentSchema.find()
        .populate("userId")
        .populate("bookingId")

        res.status(200).json({
            message:"All payments fetched",
            data:allPayments
        })

    }catch(error){
        res.status(500).json({
            message:"Error while getting payments",
            err:error
        })
    }
};
const updatePayment = async (req,res)=>{
    try{

        const updatePaymentObj = await paymentSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.status(200).json({
            message:"Payment updated successfully",
            data:updatePaymentObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating payment",
            err:error
        })
    }
};
const deletePayment = async (req,res)=>{
    try{

        const deletePaymentObj = await paymentSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Payment deleted successfully",
            data:deletePaymentObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting payment",
            err:error
        })
    }
};
module.exports = {newPayment,getAllPayments,updatePayment,deletePayment, createOrder, verifyPayment}


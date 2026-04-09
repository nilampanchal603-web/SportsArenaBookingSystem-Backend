const bookingSchema = require("../models/BookingModel")
const mailSend = require("../utils/MailUtil")
const fs = require("fs")
const path = require("path")

const newBooking = async (req,res)=>{
    
    try{
          const { userId, arenaId, slotId,userEmail } = req.body;
          console.log("Booking request body (backend):", req.body);
          if(!slotId){
      return res.status(400).json({ message: "Slot is required" });
    }
        const saveBooking = await bookingSchema.create(req.body)
        console.log("Booking data received:", req.body)

         if(userEmail){
            try {
                let html = fs.readFileSync(path.join(__dirname, "../templates/booking-confirm.html"), "utf8");
                html = html.replace("{{name}}", saveBooking.userId.firstName || "Player");
                html = html.replace("{{arena}}", saveBooking.arenaName || "Arena");
                html = html.replace("{{date}}", new Date(saveBooking.bookingDate).toLocaleDateString());
                html = html.replace("{{time}}", saveBooking.time || "N/A");

                await mailSend(userEmail, "Booking Confirmed - Sports Arena", html);
            } catch(mailErr) {
                console.log("Mail error:", mailErr);
            }
        }
        res.status(201).json({
            message:"Booking created successfully",
            data:saveBooking
        })

    }catch(error){
         console.log("Error in creating booking:", error);
        res.status(500).json({
            message:"Error while creating booking",
            err:error
        })
    }
};

const getAllBooking = async (req,res)=>{
    try{
        const slotSchema = require("../models/SlotModel");

        let allBooking = await bookingSchema
        .find()
        .populate("userId","firstName lastName email")
        .populate("coachId")
        .populate("arenaId","arenaName") 
        .lean();

        // Attach nested slot details manually because mongoose populate fails on subdocument IDs
        allBooking = await Promise.all(allBooking.map(async (booking) => {
            if (booking.slotId) {
                const slotDoc = await slotSchema.findOne({ "slots._id": booking.slotId });
                if (slotDoc) {
                    const slotDetail = slotDoc.slots.find(s => s._id.toString() === booking.slotId.toString());
                    if (slotDetail) {
                        booking.slotId = {
                            _id: slotDetail._id,
                            slotTime: slotDetail.slotTime,
                            endTime: slotDetail.endTime
                        };
                    } else {
                        booking.slotId = null;
                    }
                } else {
                    booking.slotId = null;
                }
            }
            return booking;
        }));

        res.status(200).json({
            message:"All bookings fetched",
            data:allBooking
        })

    }catch(error){
        console.error("Fetch booking error:", error);
        res.status(500).json({
            message:"Error while getting bookings",
            err:error
        })
    }
};

const updateBooking = async (req,res)=>{
    try{

        const updateBookingObj = await bookingSchema
        .findByIdAndUpdate(req.params.id,req.body, { returnDocument: "after" })
        .populate("userId")
        .populate("coachId")

        // Send email to player if coach confirms booking
        if (req.body.status === "confirmed" && updateBookingObj?.userId?.email) {
            try {

                let html = fs.readFileSync(
                    path.join(__dirname, "../templates/booking-approved.html"),
                    "utf8"
                )

                const playerName =
                    updateBookingObj.userId.firstName || "Player"

                const bookingDate =
                    new Date(updateBookingObj.bookingDate)
                    .toLocaleDateString()

                const bookingTime =
                    updateBookingObj.time || "N/A"

                html = html.replace("{{name}}", playerName)
                html = html.replace("{{arena}}", "Sports Arena")
                html = html.replace("{{date}}", bookingDate)
                html = html.replace("{{time}}", bookingTime)

                await mailSend(
                    updateBookingObj.userId.email,
                    "Booking Confirmed - Sports Arena",
                    html
                )

                if(updateBookingObj.coachId?.email){
                    await mailSend(
                        updateBookingObj.coachId.email,
                        "New Booking Assignment - Sports Arena",
                        html
                    )
                }

            } catch (mailError) {
                console.log("Mail error:", mailError)
            }
        }

        res.status(200).json({
            message:"Booking updated successfully",
            data:updateBookingObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while updating booking",
            err:error
        })
    }
};

const deleteBooking = async (req,res)=>{
    try{

        const deleteBookingObj =
        await bookingSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Booking deleted successfully",
            data:deleteBookingObj
        })

    }catch(error){
        res.status(500).json({
            message:"Error while deleting booking",
            err:error
        })
    }
};

module.exports = {
newBooking,
getAllBooking,
updateBooking,
deleteBooking
}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookingSchema = new Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    
    slotId: {
        type: mongoose.Types.ObjectId,
        ref: "slot",
       
    },
    arenaId: {
        type: mongoose.Types.ObjectId,
        ref: "arena",
        required: true
    },
    arenaName: {
        type: String
    },

    sportType: {
        type: String
    },

    time: {
        type: String
    },

    bookingDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "coach_assigned", "confirmed", "cancelled", "paid", "rejected"]

    },
    coachId: {
        type: mongoose.Types.ObjectId,
        ref: "coach"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    totalAmount: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("booking", bookingSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },

     bookingId:{
        type:mongoose.Types.ObjectId,
        ref:"booking",
        required:true
    },


    transactionId:{
        type:String,
        required:true,
        unique:true
    },

    paymentMode:{
        type:String,
        enum:["UPI","Card","NetBanking"],
        required:true
    },

    paymentStatus:{
        type:String,
        enum:["success","failed", "pending"],
        required:true
    },

    paymentDate:{
        type:Date,
        required:true,
        default:Date.now
    }

})

module.exports = mongoose.model("payment",paymentSchema)

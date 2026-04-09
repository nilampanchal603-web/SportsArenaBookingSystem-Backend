const mongoose = require("mongoose")
const Schema = mongoose.Schema

const slotSchema = new Schema({

    arenaId: {
        type: mongoose.Types.ObjectId,
        ref: "arena",
        required: true
    },

    sportType: {
        type: String,    
        required: true
    },

    // slotDate: {
    //     type: Date,

    // },

    slots: [
        {
            slotTime: {
                type: String,
                required: true
            },

            endTime: {
                type: String,
                required: true
            },

            availability: {
                type: String,
                enum: ["available", "booked","blocked"],
                default: "available"
            },
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "user",
                
            },
             price:{
                type:Number,
                default:0
            },
            hours:{
                type:Number,
                default:0

            }

        }
    ]

})

module.exports = mongoose.model("slot", slotSchema)
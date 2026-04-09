const mongoose = require("mongoose")
const Schema = mongoose.Schema


const arenaSchema = new Schema({
    arenaName: {
        type: String
        // required: true
    },
    sportsType: {
        type: String
        // required: true
    },
     stateId:{
        type:mongoose.Types.ObjectId,
        ref:"state"
        // required:true
    },
     cityId:{
        type:mongoose.Types.ObjectId,
        ref:"city"
        // required:true
    },

    location: {
        type: String
        // required: true
    },
     coordinates:{
        lat:{
            type:Number
            // required:true
        },
        lng:{
            type:Number
            // required:true
        }
    },
    pricePerHour: {
        type: Number
        // required: true
    },

    managerId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
        // required: true
    },

    status: {
        type: String,
        default: "available",
        enum: ["available", "maintenance"]

    },
    imagePath:[{
   type:String
    }]
})

module.exports = mongoose.model("arena", arenaSchema)
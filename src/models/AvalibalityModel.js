const mongoose=require("mongoose")
const Schema=mongoose.Schema

const availabilitySchema = new Schema({

    coachId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coach",
        required: true
    },

    day:{
        type: String,
        required: true
    },

    startTime:{
        type: String,
        required: true
    },

    endTime:{
        type: String,
        required: true
    },

    sportType:{
        type: String,
        required: true
    },

    arenaName:{
        type: String,
        required: true
    },

    status:{
        type: String,
        enum:["Available","Not Available"],
        default:"Available"
    }

})


module.exports = mongoose.model("availability",availabilitySchema)

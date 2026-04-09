const mongoose = require("mongoose")
const Schema = mongoose.Schema

const coachSchema = new Schema({
    coachName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sportType: {
        type: String,
        required: true
    },
    experience: {
        type: Number, 
        default: 0
    },

    availability: {
        type: String,
        enum: ["available", "not available"],
        default: "available"
    },
    earnings: {
        type: Number,
        default: 0
    }    

})

module.exports = mongoose.model("coach", coachSchema)
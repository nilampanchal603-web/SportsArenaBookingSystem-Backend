const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    sessionTitle: {
        type: String,
        required: true
    },

    sportType: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },


    players: {
        type: Number,
        required: true
    },
    arenaId: {
        type: mongoose.Types.ObjectId,
        ref: "arena"
    },
    arenaName: {
        type: String
    },

    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
        default: "Upcoming"
    }


})
module.exports = mongoose.model("session", sessionSchema)
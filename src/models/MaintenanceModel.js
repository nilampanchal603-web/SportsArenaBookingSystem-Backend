const mongoose = require("mongoose")
const Schema = mongoose.Schema

const maintenanceSchema = new Schema({
      maintenanceId: {
        type: Number,
        required: true,
        unique: true
    },

    arenaId: {
        type: mongoose.Types.ObjectId,
        ref: "arena",
        required: true
    },
    type: {
        type: String,
        enum: ["repair", "cleaning", "inspection", "upgrade"],
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["scheduled", "in-progress", "completed"],
        default: "scheduled"
    },
    isClosed: {
        type: String,
        default:"No",
        enum:["No","Yes"]
    },

    remarks: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("maintenance", maintenanceSchema)
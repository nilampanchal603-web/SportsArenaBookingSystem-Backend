const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "player",
        enum: ["player", "players", "arenamanager", "coach", "admin"]

    },
    phone: {
        type:String,
        required: true,
        unique: true

    },
     status: {
        type: String,
        default: "active",
        enum: ["active", "block"]
    },
     createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    }

})


module.exports = mongoose.model("user", userSchema)
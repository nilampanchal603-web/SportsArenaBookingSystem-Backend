const mongoose = require("mongoose")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },

    arenaId:{
        type:mongoose.Types.ObjectId,
        ref:"arena",
        required:true
    },

    coachId:{
        type:mongoose.Types.ObjectId,
        ref:"coach",
        required:true
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    comments:{
        type:String,
        required:true
    },

    feedbackDate:{
        type:Date,
        required:true,
        default:Date.now
    }

})

module.exports = mongoose.model("feedback", feedbackSchema)
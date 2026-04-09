const mongoose = require("mongoose");
const Schema=mongoose.Schema

const earningsSchema = new Schema({
  coachId: {
      type: mongoose.Types.ObjectId,
      ref: "coach",
      required: true
    },
  sessionId: { 
     type: mongoose.Types.ObjectId,
      ref: "session",
      required: true
  
 },
  date: {
     type: String,
      required: true 
    },
  fee: {
     type: Number,
      required: true
     },
  status: {
     type: String,
      enum: ["Paid", "Pending"],
       default: "Pending"
     },
});

module.exports = mongoose.model("earning", earningsSchema);
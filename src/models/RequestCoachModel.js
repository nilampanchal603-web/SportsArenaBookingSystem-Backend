const mongoose=require("mongoose")
const Schema=mongoose.Schema

const requestSchema = new Schema({
  playerName: {
    type: String,
    required: true
  },
  coachId: {
    type: mongoose.Types.ObjectId,
    ref: "coach",
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
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
})

module.exports = mongoose.model("request", requestSchema);


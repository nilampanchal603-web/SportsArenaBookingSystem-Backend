const earningsSchema = require("../models/CoachEacringModel")
const nodemailer=require("nodemailer")
const coachSchema=require("../models/CoachModel")

const getAllEarnings = async (req, res) => {
  try {
    const earnings = await earningsSchema.find().populate("coachId", "coachName").populate("sessionId", "sessionTitle");
    res.status(200).json({
      message: "get all earning",
      data: earnings
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching earnings",
      err: error
    });
  }
};
const addEarning = async (req, res) => {
  try {
     const { coachId, sessionId, date } = req.body;
    const newEarning = await earningsSchema.create(coachId,sessionId,date,{fee: 500});
    res.status(201).json({
      message: "Earning added",
      data: newEarning
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding earning",
      err: error
    });
  }
};
const deleteEarning = async (req, res) => {
  try {

    await earningsSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Earning deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting earning",
      err: error
    });
  }
};

const updateEarning = async (req, res) => {
  try {
    const updatedEarning = await earningsSchema.findByIdAndUpdate(
      req.params.id, 
      { status: "Paid" }, 
      { new: true }
    );
   
    res.status(200).json({
      message: "Earning status updated to Paid",
      data: updatedEarning
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating earning",
      err: error
    });
  }
};

module.exports = { getAllEarnings, addEarning, deleteEarning, updateEarning };

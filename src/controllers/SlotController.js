const slotSchema = require("../models/SlotModel")
const mongoose=require("mongoose")

const createSlot = async (req, res) => {
    try {
        const saveSlot = await slotSchema.create(req.body)

        res.status(201).json({
            message: "Slot created successfully",
            data: saveSlot
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while creating slot",
            err: error
        })
    }
};
const getAllSlot = async (req, res) => {
    try {

        const allSlots = await slotSchema.find().populate("arenaId", "arenaName").populate("slots.userId")

        res.status(200).json({
            message: "All slots fetched",
            data: allSlots
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while getting slots",
            err: error
        })
    }
};
const getSlotById = async (req, res) => {
    try {
        const slot = await slotSchema
            .findById(req.params.id)
            .populate("arenaId");
        if (!slot) return res.status(404).json({ message: "Slot not found" });

        res.status(200).json({ data: slot });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}
const getSlotsByArena = async (req, res) => {
  try {
    const arenaId = req.params.arenaId;

    const slots = await slotSchema.find({ arenaId })
      .select("slots") // sirf slots bhejenge
      .lean();         // plain JS object

    res.status(200).json({
      message: "Slots fetched successfully",
      data: slots
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching slots", err: error.message });
  }
};


    const updateSlot = async (req, res) => {
        try {
            const { arenaId, sportType, slots } = req.body;

            // Validate payload
            if (!arenaId || !slots?.length) {
                return res.status(400).json({ message: "Arena ID and slots are required" });
            }

            // Check if slot exists
            const existingSlot = await slotSchema.findById(req.params.id);
            if (!existingSlot) return res.status(404).json({ message: "Slot not found" });

            // Update slot
            const updatedSlot = await slotSchema.findByIdAndUpdate(
                req.params.id,
                {
                    arenaId: new mongoose.Types.ObjectId(arenaId),
                    sportType,
                    slots: slots.map(s => ({
                        slotTime: s.slotTime || "00:00",
                        endTime: s.endTime || "00:00",
                        availability: s.availability || "available"
                    }))
                },
                 { returnDocument: 'after' }
            ).populate("arenaId"); // populate arenaName
            res.status(200).json({ message: "Slot updated", data: updatedSlot });
        } catch (error) {
            console.error("Update Slot Error:", error);
            res.status(500).json({ message: "Error updating slot", error: error.message });
        }
    };

    const deleteSlot = async (req, res) => {
        try {

            const deleteSlotObj = await slotSchema.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: "Slot deleted successfully",
                data: deleteSlotObj
            })

        } catch (error) {
            res.status(500).json({
                message: "Error while deleting slot",
                err: error
            })
        }
    };
    module.exports = { createSlot, getAllSlot,getSlotsByArena, getSlotById, updateSlot, deleteSlot }

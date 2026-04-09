const citySchema=require("../models/CityModel")

const addCity = async (req, res) => {
    try {
        const savedCity = await citySchema.create(req.body)

        res.status(201).json({
            message: "City created successfully",
            data: savedCity
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while creating city",
            err: error
        })
    }
};
const getAllCities = async (req, res) => {
    try {
        const cities = await citySchema.find().populate("stateId")

        res.status(200).json({
            message: "All cities fetched successfully",
            data: cities
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while fetching cities",
            err: error
        })
    }
};
const updateCity = async (req, res) => {
    try {
        const updatedCityObj = await citySchema.findByIdAndUpdate(req.params.id,req.body,{ new: true })

        res.status(200).json({
            message: "City updated successfully",
            data: updatedCityObj
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while updating city",
            err: error
        })
    }
};
const deleteCity = async (req, res) => {
    try {
      const deleteCityObj= await citySchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "City deleted successfully",
            data:deleteCityObj
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while deleting city",
            err: error
        })
    }
};
module.exports = {addCity,getAllCities,updateCity,deleteCity}



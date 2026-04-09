const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pricingSchema = new Schema(
    {
        hourlyPricing: {
            type: Number,
            default: 0
        },
        dailyPricing: {
            type: Number,
            default: 0
        },
        monthlyPricing: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("pricing", pricingSchema)

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "Inactive"],
    }
})
module.exports = mongoose.model("categories", categorySchema)
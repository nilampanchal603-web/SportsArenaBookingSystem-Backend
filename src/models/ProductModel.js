const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
    },
    price:{
        type:Number
    },
    //...... other fileds
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:"categories" // check in category model model name must pass here to bind relation
    },
    imagePath:{
        type:String
    }
})
module.exports=mongoose.model("product",productSchema)
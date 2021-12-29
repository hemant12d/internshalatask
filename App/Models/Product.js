const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required"],
    },
    discription:{
    type: String,
    required: [true, "Discription is required"]
    },
    quantity:{
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, "Product must have Price"]
    },
    _createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Product must be belong to user"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }  
});



// Compiling Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:Number,
    description:String,
    price:Number,
    thumbnails:String,
    code:String,
    stock:Number

});

export const productModel = mongoose.model("products", productSchema);
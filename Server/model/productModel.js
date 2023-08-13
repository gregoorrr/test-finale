import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type:String, required: true, unique: true},
        slug: {type:String, required: true, unique: true},
        description: {type:String, required: true, unique: true},
        price: {type:Number,required: true, unique:true},
        category: {type:String,required: true, unique: true}
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product
import express from "express";
import Data from "./Products.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Product from "./model/productModel.js";



const seedRouter = express.Router()

seedRouter.get('/', async (req,res)=>{
    const createdProducts= await Product.insertMany(Data.products)
    res.send({ createdProducts })
})
dotenv.config()

mongoose
.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log('database connected ')
})
.catch((err)=>{
    console.log(err.message)
})

const app = express()
app.use(express.json());
app.use(express.urlencoded({extendend: true}))
app.use(express.static("public"));

app.use('/api/seed', seedRouter)     

app.get('/api/products', (req,res) =>{
    res.send(Data.products)
})
app.get('/api/products/slug/:slug', (req,res) =>{
    const product = Data.products.find(x => x.slug === req.params.slug)
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message : 'Product not found'})
    }
    res.send(Data.products)
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`the server is running on http://localhost:${port}`))
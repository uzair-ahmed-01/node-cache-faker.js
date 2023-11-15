import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import NodeCache from "node-cache"
//import { generateProducts } from "./fake Data Generator/faker.js";
import { Product } from "./fake Data Generator/schema.js";
import exp from "constants";

dotenv.config({
    path: ".env",
});

const app = express()
const port = process.env.PORT
const nodeCache = new NodeCache()

app.use(express.json())

// Use morgan middleware for logging HTTP requests
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI, { dbName: "TEMPO" })
    .then(() => console.log("Database Connected"))
    .catch((err) => {
        console.error("Database Connection Error:", err)
        process.exit(1)
    });


app.get("/", (req, res) => {
    res.send("API is working")
})

app.get("/products", async (req, res) => {
    let products;

    if (nodeCache.has("products")) {
        products = JSON.parse(nodeCache.get("products"))
    } else {
        products = await Product.find();
        nodeCache.set("products", JSON.stringify(products))
    }
    return res.json({
        success: true,
        products,
    })
})

app.put("/update", async (req, res) => {
    const product =await Product.findById(req.query.id)
    product.name = req.body.name

    await product.save();
    nodeCache.del("products")

    return res.json({
        success: true,
        Message: "Updated",
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

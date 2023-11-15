import mongoose from "mongoose";

export const Product = mongoose.model(
    "Product",
    mongoose.Schema(
        {
            name: {
                type: String,
                requried: [true, "Please enter Name"],
            },
            photo: {
                type: String,
                requried: [true, "Please enter Photo"],
            },
            price: {
                type: Number,
                requried: [true, "Please enter Price"],
            },
            stock: {
                type: Number,
                requried: [true, "Please enter Stock"],
            },
            category: {
                type: String,
                requried: [true, "Please enter Category"],
                trim: true,
            },
        },
        {
            timestapms : true,
        }
    )
) 
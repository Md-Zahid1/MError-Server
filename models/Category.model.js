import { Schema, model } from "mongoose";


const schema = new Schema({
    title: String,
    description: String,
    banner: String,
    type: String
}, { timestamps: true })

export const CategoryModel = model("Category", schema)
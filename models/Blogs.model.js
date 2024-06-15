import { Schema, model } from "mongoose";

const schema = new Schema({
    // user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    banner: String,
    title: String,
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    description: String,
    contant: String
}, { timestamps: true });

export const BlogsModel = model('Blog', schema)
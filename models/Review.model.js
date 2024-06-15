import { Schema, model } from "mongoose";


const schema = new Schema({
    consultant: { required: true, type: Schema.Types.ObjectId, ref: "Consultant" },
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    rate: Number,
    comment: String,
    like: Number
}, { timestamps: true })

export const ReviewModel = model("Review", schema)
import { Schema, model } from "mongoose";

const schema = new Schema({
    title: String,
    description: String,
    count: Number,
    discountValue: Number,
    discountType: String,
    discountStartAmount: Number,
    maximamDiscount: Number
}, { timestamps: true })

export const PackegeModel = model("Packege", schema)
import { Schema, model } from "mongoose"


const schema = new Schema({

}, { timestamps: true })

export const ResultModel = model("Result", schema)
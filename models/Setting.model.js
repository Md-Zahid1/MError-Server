import { Schema, model } from "mongoose";

const schema = new Schema({

}, { timestamps: true })

export const SettingModel = model("Setting", schema)
import { Schema, model } from "mongoose";

const schema = new Schema({
    avatar: String,
    name: String,
    mobile: Number,
    gender: String,
    googleId: { type: String, unique: true, sparse: true },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: String
}, { timestamps: true })

export const UserModel = model("User", schema)
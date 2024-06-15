import { Schema, model } from "mongoose";


const schema = new Schema({
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    rate: Number,
    ratingsExperience: String,
    improve: String,
    suggestions: String
}, { timestamps: true })

export const FeedbackModel = model("Feedback", schema)
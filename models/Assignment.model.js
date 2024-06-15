import { Schema, model } from "mongoose";

const option = {
    option: String,
    image: String,
    color: String,
}

const questions = new Schema({
    question: String,
    answer: String,
    type: String,
    options: {
        a: option,
        b: option,
        c: option,
        d: option
    }
})

const schema = new Schema({
    banner: String,
    title: String,
    description: String,
    basedOn: String,
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    questions: [
        questions
    ]
}, { timestamps: true });

export const AssignmentModel = model('Assignment', schema)
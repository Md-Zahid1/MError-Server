import { Schema, model } from "mongoose";

const slote = new Schema({
    startDate: Date,
    endDate: Date,
    startTime: String,
    endTime: String,
    duration: Number
})

const session = new Schema({
    duration: Number,
    sessions: [{
        session: String,
        price: Number
    }],
})


const schema = new Schema({
    avatar: String,
    name: String,
    email: { type: String, unique: true },
    mobile: Number,
    city: String,
    designation: String,
    dipartment: String,
    experince: String,
    languages: [String],
    expertise: [String],
    cases: Number,
    rating: Number,
    about: String,
    funFact: String,
    fee: {
        chatting: Number,
        voiceCall: Number,
        videoCall: Number
    },
    packege: {
        chat: [session],
        voice: [session],
        video: [session]
    },
    working: [slote],
    broken: [slote]
}, { timestamps: true });

export const ConsultantsModel = model('Consultant', schema)
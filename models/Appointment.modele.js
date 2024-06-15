import { model, Schema } from "mongoose";


const schema = new Schema({
    consultant: { required: true, type: Schema.Types.ObjectId, ref: "Consultant" },
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    slot: Date,
    sessionMode: String,
    duration: Number,
    packege: { required: true, type: Schema.Types.ObjectId, ref: "Packege" },
    payment: { required: true, type: Schema.Types.ObjectId, ref: "" },
    feeAmount: Number,
    gstAmount: Number,
    totalAmount: Number,
    status: String,
    paymentStatus: String

}, { timestamps: true })

export const AppointmentModel = model("Appointment", schema)
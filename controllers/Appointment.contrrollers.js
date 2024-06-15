import moment from "moment"
import { ConsultantsModel } from "../models/Consultants.model.js";
import { AppointmentModel } from "../models/Appointment.modele.js";

export const cheackAppointment = async (req, res, next) => {
    try {
        const { date } = req.query;
        const { id } = req.params;

        if (!id) {
            return res.status(409).json({
                message: "consultant id required"
            })
        }
        const apointDate = date ?? moment().format("YYYY-MM-DD");

        const [consultant, appointments] = await Promise.all([
            ConsultantsModel.findById(id),
            AppointmentModel.find({
                consultant: id,
                slot: {
                    $gte: apointDate,
                    $lte: moment(apointDate).add(1, "d")
                }
            })
        ]);

        const bookedAppontmentMap = appointments.reduce((acc, apoint) => {
            acc[String(apoint.slot)] = 1;
            return acc;
        }, {});

        const availablity = consultant?.working.map((d) => {
            const start = moment(`${apointDate} ${d.startTime}`, 'YYYY-MM-DD HH:mm');
            const from = moment(`${apointDate} ${d.startTime}`, 'YYYY-MM-DD HH:mm');
            const end = moment(`${apointDate} ${d.endTime}`, 'YYYY-MM-DD HH:mm');
            let slots = [];
            let isoString = '';

            if (moment(start).isSameOrBefore(d.startDate)) {
                return { start: from, end, slots };
            }
            for (
                let current = start;
                // current <= end;
                moment(current).isSameOrBefore(d.endDate);
                current.add(d.duration ?? 15, 'm')
            ) {
                isoString = current.toISOString();
                slots.push({
                    isAvailable: !Boolean(bookedAppontmentMap[isoString]),
                    time: current.toISOString()
                })
            }
            return { start: from, end, slots };
        });

        return res.status(201).json({
            message: "Appointment Slot",
            result: { apointDate, consultant, appointments: availablity }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const createAppointment = async (req, res, next) => {
    try {
        const appointment = await AppointmentModel.create(req.body)
        return res.status(201).json({
            message: "Appointment Created Successfully",
            result: appointment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getAppointment = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1; 
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "sessionMode": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        [data, count] = await Promise.all([
            AppointmentModel.find(filter).populate(["consultant", "user"]).limit(limit).skip((page * limit) - limit),
            AppointmentModel.countDocuments(filter)
        ]
        )
        return res.status(200).json({
            message: "Appointment",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const appointmentDetail = async (req, res, next) => {
    try {
        const appointment = await AppointmentModel.findOne({ _id: req.params.id }).populate("consultant", "user")
        return res.status(200).json({
            message: "Appointment Detail",
            result: appointment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            result: err
        })
    }
}


export const updateAppointment = async (req, res, next) => {
    try {
        const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Appointment Updated Successfully",
            result: appointment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await AppointmentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Appointment Deleted Successfully",
            result: appointment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
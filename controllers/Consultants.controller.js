import { ConsultantsModel } from "../models/Consultants.model.js";

export const createConsultants = async (req, res, next) => {
    try {
        const consultants = await ConsultantsModel.create(req.body)

        return res.status(201).json({
            message: "Consultants Created Successfully",
            result: consultants
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const getConsultant = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) { 
            filter["$or"] = [
                { "name": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "email": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "profession": { $regex: `^${req.query.search}`, $options: 'i' } },
            ]
        }

        [data, count] = await Promise.all([
            ConsultantsModel.find(filter).limit(limit).skip((page * limit) - limit),
            ConsultantsModel.countDocuments(filter)
        ])


        return res.status(200).json({
            message: "Consultant",
            result: data,
            count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const consultantDetail = async (req, res, next) => {
    try {
        const consultant = await ConsultantsModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Consultant Details",
            result: consultant
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const updateConsultant = async (req, res, next) => {
    try {
        const consultant = await ConsultantsModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Consultant Created Successfully",
            result: consultant
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteConsultant = async (req, res, next) => {
    try {
        const consultant = await ConsultantsModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Consultant Deleted Successfully",
            result: consultant
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
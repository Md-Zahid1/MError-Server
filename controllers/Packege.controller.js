import { PackegeModel } from "../models/Packege.model.js"

export const createPackege = async (req, res, next) => {
    try {
        const packege = await PackegeModel.create(req.body)
        return res.status(201).json({
            message: "Packege Created Successfully",
            result: packege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const packegeDetail = async (req, res, next) => {
    try {
        const packege = await PackegeModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Packege Detail",
            result: packege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getPackege = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "title": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "description": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        [data, count] = await Promise.all([
            PackegeModel.find(filter).limit(limit).skip((page * limit) - limit),
            PackegeModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Packege",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const updatePackege = async (req, res, next) => {
    try {
        const packege = await PackegeModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Packege Updated Successfuly",
            result: packege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

export const deletePackege = async (req, res, next) => {
    try {
        const packege = await PackegeModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Packege Deleted Successfuly",
            result: packege
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }

}
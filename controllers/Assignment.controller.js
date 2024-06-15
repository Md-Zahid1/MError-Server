import { AssignmentModel } from "../models/Assignment.model.js"

export const createAssignment = async (req, res, next) => {
    try {
        const assignment = await AssignmentModel.create(req.body)

        return res.status(201).json({
            message: "Assignment Created Successfully",
            result: assignment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}

export const getAssignment = async (req, res, next) => {
    try {
        let assignment;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}

        if (req.query.search) {
            filter["$or"] = [
                { "title": { $regex: `^${req.query.search}`, $options: 'i' } },
            ]
        }

        if (req.query.user) {
            filter["user"] = req.query.user
        }

        [assignment, count] = await Promise.all([
            AssignmentModel.find(filter).populate("category").limit(limit).skip((page * limit) - limit),
            AssignmentModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Assignment",
            result: assignment, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const assignmentDetail = async (req, res, next) => {
    try {
        const assignment = await AssignmentModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Assignment Details",
            result: assignment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const updateAssignment = async (req, res, next) => {
    try {
        const assignment = await AssignmentModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Assignment Updated Successfully",
            result: assignment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const deleteAssignment = async (req, res, next) => {
    try {
        const assignment = await AssignmentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Assignment Delete Successfully",
            result: assignment
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
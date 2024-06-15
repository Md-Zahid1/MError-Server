import { FeedbackModel } from "../models/Feedback.model.js"


export const createFeedback = async (req, res, next) => {
    try {
        const feedback = await FeedbackModel.create(req.body)
        return res.status(201).json({
            message: "Feedback Created Successfully",
            result: feedback
        })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getFeedback = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "ratingsExperience": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        [data, count] = await Promise.all([
            FeedbackModel.find(filter).populate("user").limit(limit).skip((page * limit) - limit),
            FeedbackModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Feedback",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const feedbackDetail = async (req, res, next) => {
    try {
        const feedback = await FeedbackModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Feedback",
            result: feedback
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const updateFeedback = async (req, res, next) => {
    try {
        const feedback = await FeedbackModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Feedback Updated",
            result: feedback
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteFeedback = async (req, res, next) => {
    try {
        const feedback = await FeedbackModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Feedback Deleted",
            result: feedback
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
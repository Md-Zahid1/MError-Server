import { ReviewModel } from "../models/Review.model.js"

export const createReview = async (req, res, next) => {
    try {
        const review = await ReviewModel.create(req.body)
        return res.status(201).json({
            message: "Review Created Successfully",
            result: review
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const getReview = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "rate": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        if (req.query.consultant) {
            filter["consultant"] = req.query.consultant
        }

        [data, count] = await Promise.all([
            ReviewModel.find(filter).populate(["consultant", "user"]).limit(limit).skip((page * limit) - limit),
            ReviewModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Review",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getConsultantReview = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "rate": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        if (req.query.consultant) {
            filter["consultant"] = req.query.consultant
        }

        [data, count] = await Promise.all([
            ReviewModel.find(filter).populate("user", "name avatar").limit(limit).skip((page * limit) - limit),
            ReviewModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Review",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const reviewDetail = async (req, res, next) => {
    try {
        const review = await ReviewModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Review",
            result: review
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }

}



export const updateReview = async (req, res, next) => {
    try {
        const review = await ReviewModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Review Updated Successfully",
            result: review
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteReview = async (req, res, next) => {
    try {
        const review = await ReviewModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Review Deleted Successfully",
            result: review
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
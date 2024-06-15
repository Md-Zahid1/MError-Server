import { CategoryModel } from "../models/Category.model.js"

export const createCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.create(req.body)

        return res.status(201).json({
            message: "Category Created Successfully",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }

}


export const getCategory = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "title": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "description": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "type": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        if (req.query.type) {
            filter["type"] = req.query.type
        }


        [data, count] = await Promise.all([
            CategoryModel.find(filter).limit(limit).skip((page * limit) - limit),
            CategoryModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "Category",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const getCategoryById = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id)
        return res.status(200).json({
            message: "Category",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const categoryDetail = async (req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Category Detail",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            result: err
        })
    }
}



export const updateCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Category Updated Successfully",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteCategory = async (req, res, next) => {

    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Category Deleted Successfully",
            result: category
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
import { BlogsModel } from "../models/Blogs.model.js";

export const createBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogsModel.create(req.body)

        return res.status(201).json({
            message: "Blogs Created SUccessfully",
            result: blogs
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        });
    }
}


export const getBlog = async (req, res, next) => {
    try {

        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "type": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        if (req.query.user) {
            filter["user"] = req.query.user
        }

        [data, count] = await Promise.all([
            BlogsModel.find(filter).populate("category").limit(limit).skip((page * limit) - limit),
            BlogsModel.countDocuments(filter)
        ]
        )


        return res.status(200).json({
            message: "Blog",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await BlogsModel.findById(req.params.id)
        return res.status(200).json({
            message: "Blog",
            return: blog
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const blogDetail = async (req, res, next) => {
    try {
        const blog = await BlogsModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "Blog Detail",
            result: blog
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            result: err
        })
    }
}



export const updateBlog = async (req, res, next) => {
    try {
        const blog = await BlogsModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({
            message: "Blog Updated Successfully",
            result: blog
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await BlogsModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Blog Deleted Successfully",
            result: blog
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
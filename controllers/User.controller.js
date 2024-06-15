import { UserModel } from "../models/User.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { JWT_SECRET } from "../config/index.js"
import { sendOTP } from "../services/emailService/sendOTP.js"


export const registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User Register",
            result: user
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const googleLogin = async (req, res, next) => {
    try {
        if (!req.body.googleId) {
            return res.status(401).json({ message: "Username OR Password Wrong!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.googleId, 10)
        const user = await UserModel.findOneAndUpdate(
            { googleId: req.body.googleId },
            {
                avatar: req.body.avatar,
                name: req.body.name,
                email: req.body.email,
                googleId: req.body.googleId,
                password: hashedPassword
            }, { upsert: true, new: true })

        const jwtToken = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login",
            result: jwtToken
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(401).json({ message: "User Not Found" })
        }

        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return res.status(401).json({ message: "Username OR Password Wrong!" });
        }

        const jwtToken = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login",
            result: jwtToken
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const guestLogin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
        if (user) {
            return res.status(403).json({
                message: "User AllReady Exist"
            })
        }
        const guest = await UserModel.create(req.body)
        const jwtToken = jwt.sign({ _id: guest._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Guest Login",
            result: jwtToken
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const forgotPassword = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const otp = crypto.randomInt(100000, 999999);
        console.log("otp", otp)

        const expires = Date.now() + 1000 * 60 * 10;
        const rowData = `${user.email}${otp}${expires}`;

        const hashotp = await bcrypt.hash(rowData, 10);

        const hash = `${hashotp}_._${expires}`


        sendOTP("otpToUser", user, { otp })

        return res.status(200).json({
            message: "OTP Send",
            result: otp, hash, email: user.email
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

export const otpPassVerify = async (req, res, next) => {
    try {

        const { otp, hash, email, password } = req.body;
        if (!otp || !hash || !email) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('_._');
        if (Date.now() > +expires) {
            return res.status(400).json({ message: 'OTP expired!' });
        }
        console.log("exp", expires, hashedOtp)
        const rowData = `${email}${otp}${expires}`;

        const isValid = await bcrypt.compare(rowData, hashedOtp)

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const pass = await bcrypt.hash(password, 10);

        const user = await UserModel.findOneAndUpdate({ email }, { password: pass })

        return res.status(200).json({
            message: "OTP Verified",
            result: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }

}

export const me = async (req, res, next) => {
    try {
        const Me = await UserModel.findById({ _id: req.user._id })
        return res.status(201).json({
            message: "Me",
            result: Me
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}

export const getUser = async (req, res, next) => {
    try {
        let data;
        let count;
        const limit = req.query.limit ?? 10;
        const page = req.query.page ?? 1;
        const filter = {}
        if (req.query.search) {
            filter["$or"] = [
                { "name": { $regex: `^${req.query.search}`, $options: 'i' } },
                { "email": { $regex: `^${req.query.search}`, $options: 'i' } }
            ]
        }

        [data, count] = await Promise.all([
            UserModel.find(filter).limit(limit).skip((page * limit) - limit),
            UserModel.countDocuments(filter)
        ])

        return res.status(200).json({
            message: "User",
            result: data, count
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const userDetail = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id })
        return res.status(200).json({
            message: "User Detail",
            result: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}



export const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "User Deleted Successfully",
            result: user
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
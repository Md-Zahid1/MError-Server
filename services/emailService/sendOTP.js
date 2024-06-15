import nodemailer from "nodemailer"
import otpTamplate from "./otpTamplate.js"

export const sendOTP = async (type, user, detail) => {
    try {

        const otpTamp = { ...otpTamplate[type] }

        if (otpTamp.html.includes("{{OTP}}")) {
            otpTamp.html = otpTamp.html.replace("{{OTP}}", detail.otp)
        }

        if (otpTamp.html.includes("{{name}}")) {
            otpTamp.html = otpTamp.html.replace("{{name}}", user.name)
        }


        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GOOGLE_SMTP_EMAIL,
                pass: process.env.GOOGLE_SMTP_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_SMTP_EMAIL,
            to: user.email,
            subject: otpTamp.subject,
            text: "Hello world?",
            html: otpTamp.html,
        });

        console.log("Message sent: %s", info.messageId);
        return detail
    } catch (err) {
        console.log("error", err)
        return null
    }
}

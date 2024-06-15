import { AppointmentModel } from "../models/Appointment.modele.js"
import { AssignmentModel } from "../models/Assignment.model.js"
import { ConsultantsModel } from "../models/Consultants.model.js"
import { UserModel } from "../models/User.model.js"



export const dashboard = async (req, res, next) => {
    try {
        let user;
        let consultant;
        let assignment;
        let appointment;


        [user, consultant, assignment, appointment] = await Promise.all([
            UserModel.countDocuments(),
            ConsultantsModel.countDocuments(),
            AssignmentModel.countDocuments(),
            AppointmentModel.countDocuments(),
        ])
        return res.status(200).json({
            message: "Dashboard",
            result: { user, consultant, assignment, appointment }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: err
        })
    }
}
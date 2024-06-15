import express from 'express'
import { assignmentDetail, createAssignment, deleteAssignment, getAssignment, updateAssignment } from '../controllers/Assignment.controller.js'
import { blogDetail, createBlogs, deleteBlog, getBlog, getBlogById, updateBlog } from '../controllers/Blogs.controller.js'
import { consultantDetail, createConsultants, deleteConsultant, getConsultant, updateConsultant } from '../controllers/Consultants.controller.js'
import { appointmentDetail, cheackAppointment, createAppointment, deleteAppointment, getAppointment, updateAppointment } from '../controllers/Appointment.contrrollers.js'
import { categoryDetail, createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from '../controllers/Category.controller.js'
import { createPackege, deletePackege, getPackege, packegeDetail, updatePackege } from '../controllers/Packege.controller.js'
import { createReview, deleteReview, getConsultantReview, getReview, reviewDetail, updateReview } from '../controllers/Review.controlles.js'
import { deleteUser, forgotPassword, getUser, googleLogin, guestLogin, loginUser, me, otpPassVerify, registerUser, userDetail } from '../controllers/User.controller.js'
import { createFeedback, deleteFeedback, feedbackDetail, getFeedback } from '../controllers/Feedback.controller.js'
import auth from '../middlewares/auth.js'
import { dashboard } from '../controllers/Dashboard.controller.js'

const router = express.Router()

router.get("/dashboard", dashboard)
router.post("/cheack-appoint/:id", cheackAppointment)
router.post("/forgot-password", forgotPassword)
router.post("/otp-verify", otpPassVerify)

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.post("/guest-login", guestLogin)
router.post("/google-login", googleLogin)
router.post("/me", auth, me)

router.post("/create-assignment", createAssignment)
router.post("/create-category", createCategory)
router.post("/create-blogs", createBlogs)
router.post("/create-consultants", createConsultants)
router.post("/create-appointment", createAppointment)
router.post("/create-packege", createPackege)
router.post("/create-review", createReview)
router.post("/create-feedback", createFeedback)

router.post("/delete-appointment/:id", deleteAppointment)
router.post("/delete-assignment/:id", deleteAssignment)
router.post("/delete-blog/:id", deleteBlog)
router.post("/delete-category/:id", deleteCategory)
router.post("/delete-consultant/:id", deleteConsultant)
router.post("/delete-feedback/:id", deleteFeedback)
router.post("/delete-packege/:id", deletePackege)
router.post("/delete-review/:id", deleteReview)
router.post("/delete-user/:id", deleteUser)

router.post("/update-appointment/:id", updateAppointment)
router.post("/update-assignment/:id", updateAssignment)
router.post("/update-blog/:id", updateBlog)
router.post("/update-category/:id", updateCategory)
router.post("/update-consultant/:id", updateConsultant)
router.post("/update-packege/:id", updatePackege)
router.post("/update-review/:id", updateReview)

router.get("/get-appointment", getAppointment)
router.get("/get-assignment", getAssignment)
router.get("/get-blog", getBlog)
router.get("/get-category", getCategory)
router.get("/get-consultant", getConsultant)
router.get("/get-feedback", getFeedback)
router.get("/get-review", getReview)
router.get("/get-packege", getPackege)
router.get("/get-user", getUser)
router.get("/get-consultant-review", getConsultantReview)

router.get("/get-category/:id", getCategoryById)
router.get("/get-blog/:id", getBlogById)

router.get("/blog-detail/:id", blogDetail)
router.get("/appointment-detail/:id", appointmentDetail)
router.get("/category-detail/:id", categoryDetail)
router.get("/assignment-detail/:id", assignmentDetail)
router.get("/consultant-detail/:id", consultantDetail)
router.get("/feedback-detail/:id", feedbackDetail)
router.get("/packege-detail/:id", packegeDetail)
router.get("/review-detail/:id", reviewDetail)
router.get("/user-detail/:id", userDetail)

export default router
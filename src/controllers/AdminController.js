const bcrypt = require("bcrypt")
const userSchema = require("../models/UserModel")
const arenaSchema = require("../models/ArenaModel")
const bookingSchema = require("../models/BookingModel")
const paymentSchema = require("../models/PaymentModel")
const pricingSchema = require("../models/PricingModel")
const coachSchema = require("../models/CoachModel")

const getAdminDashboard = async (req, res) => {
    try {
        const [totalUsers, totalArenas, totalBookings, payments, totalCoaches, totalRequests] = await Promise.all([
            userSchema.countDocuments(),
            arenaSchema.countDocuments(),
            bookingSchema.countDocuments(),
            paymentSchema.find({ paymentStatus: "success" }).populate("bookingId"),
            coachSchema.countDocuments(),
            bookingSchema.countDocuments({ status: { $in: ["pending", "coach_assigned"] } })
        ])

        const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment?.bookingId?.totalAmount || 0), 0)

        return res.status(200).json({
            message: "admin dashboard fetched successfully",
            data: { totalUsers, totalArenas, totalBookings, totalRevenue, totalCoaches, totalRequests }
        })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching dashboard", err: error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find().select("-password")
        return res.status(200).json({ message: "users fetched successfully", data: users })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching users", err: error })
    }
}

const approveUser = async (req, res) => {
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(
            req.params.id,
            { status: "active" },
            { new: true }
        ).select("-password")
        return res.status(200).json({ message: "user approved successfully", data: updatedUser })
    } catch (error) {
        return res.status(500).json({ message: "error while approving user", err: error })
    }
}

const blockUser = async (req, res) => {
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(
            req.params.id,
            { status: "block" },
            { new: true }
        ).select("-password")
        return res.status(200).json({ message: "user blocked successfully", data: updatedUser })
    } catch (error) {
        return res.status(500).json({ message: "error while blocking user", err: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userSchema.findByIdAndDelete(req.params.id).select("-password")
        return res.status(200).json({ message: "user deleted successfully", data: deletedUser })
    } catch (error) {
        return res.status(500).json({ message: "error while deleting user", err: error })
    }
}

const getAdminArenas = async (req, res) => {
    try {
        const arenas = await arenaSchema.find().populate("stateId").populate("cityId").populate("managerId")
        return res.status(200).json({ message: "arenas fetched successfully", data: arenas })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching arenas", err: error })
    }
}

const addAdminArena = async (req, res) => {
    try {
        const newArena = await arenaSchema.create(req.body)
        return res.status(201).json({ message: "arena created successfully", data: newArena })
    } catch (error) {
        return res.status(500).json({ message: "error while creating arena", err: error })
    }
}

const updateAdminArena = async (req, res) => {
    try {
        const updatedArena = await arenaSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json({ message: "arena updated successfully", data: updatedArena })
    } catch (error) {
        return res.status(500).json({ message: "error while updating arena", err: error })
    }
}

const deleteAdminArena = async (req, res) => {
    try {
        const deletedArena = await arenaSchema.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "arena deleted successfully", data: deletedArena })
    } catch (error) {
        return res.status(500).json({ message: "error while deleting arena", err: error })
    }
}

const getPricing = async (req, res) => {
    try {
        let pricing = await pricingSchema.findOne()
        if (!pricing) {
            pricing = await pricingSchema.create({})
        }
        return res.status(200).json({ message: "pricing fetched successfully", data: pricing })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching pricing", err: error })
    }
}

const upsertPricing = async (req, res) => {
    try {
        let pricing = await pricingSchema.findOne()
        if (!pricing) {
            pricing = await pricingSchema.create(req.body)
        } else {
            pricing.hourlyPricing = req.body.hourlyPricing ?? pricing.hourlyPricing
            pricing.dailyPricing = req.body.dailyPricing ?? pricing.dailyPricing
            pricing.monthlyPricing = req.body.monthlyPricing ?? pricing.monthlyPricing
            await pricing.save()
        }
        return res.status(200).json({ message: "pricing updated successfully", data: pricing })
    } catch (error) {
        return res.status(500).json({ message: "error while updating pricing", err: error })
    }
}

const getBookingReport = async (req, res) => {
    try {
        const bookings = await bookingSchema.find().populate("userId").populate("coachId")
        return res.status(200).json({ message: "booking report fetched successfully", data: bookings })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching booking report", err: error })
    }
}

const getRevenueReport = async (req, res) => {
    try {
        const payments = await paymentSchema.find().populate("userId").populate("bookingId")
        const totalRevenue = payments
            .filter((payment) => payment.paymentStatus === "success")
            .reduce((sum, payment) => sum + Number(payment?.bookingId?.totalAmount || 0), 0)

        return res.status(200).json({
            message: "revenue report fetched successfully",
            data: { totalRevenue, payments }
        })
    } catch (error) {
        return res.status(500).json({ message: "error while fetching revenue report", err: error })
    }
}

const createDefaultAdminIfMissing = async () => {
    const adminEmail = "adminsportsarena@gmail.com"
    const adminPassword = "admin1"
    const existingAdmin = await userSchema.findOne({ email: adminEmail })

    if (!existingAdmin) {
        const hashPassword = await bcrypt.hash(adminPassword, 10)
        await userSchema.create({
            firstName: "System",
            lastName: "Admin",
            email: adminEmail,
            password: hashPassword,
            phone: `99999${Math.floor(10000 + Math.random() * 89999)}`,
            role: "admin",
            status: "active"
        })
        console.log("Default admin created: adminsportsarena@gmail.com")
    }
}

module.exports = {
    getAdminDashboard,
    getAllUsers,
    approveUser,
    blockUser,
    deleteUser,
    getAdminArenas,
    addAdminArena,
    updateAdminArena,
    deleteAdminArena,
    getPricing,
    upsertPricing,
    getBookingReport,
    getRevenueReport,
    createDefaultAdminIfMissing
}

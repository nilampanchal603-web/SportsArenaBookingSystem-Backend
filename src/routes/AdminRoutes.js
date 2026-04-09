const router = require("express").Router()
const adminController = require("../controllers/AdminController")
const { validateToken, authorizeRoles } = require("../middleware/AuthMiddleware")

router.use(validateToken, authorizeRoles("admin"))

router.get("/dashboard", adminController.getAdminDashboard)

router.get("/users", adminController.getAllUsers)
router.patch("/users/:id/approve", adminController.approveUser)
router.patch("/users/:id/block", adminController.blockUser)
router.delete("/users/:id", adminController.deleteUser)

router.get("/arenas", adminController.getAdminArenas)
router.post("/arenas", adminController.addAdminArena)
router.put("/arenas/:id", adminController.updateAdminArena)
router.delete("/arenas/:id", adminController.deleteAdminArena)

router.get("/pricing", adminController.getPricing)
router.put("/pricing", adminController.upsertPricing)

router.get("/reports/booking", adminController.getBookingReport)
router.get("/reports/revenue", adminController.getRevenueReport)

module.exports = router

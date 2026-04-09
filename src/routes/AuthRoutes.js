const userController = require("../controllers/UserController")
const router = require("express").Router()

router.post("/register", userController.registerUser)
router.post("/login", userController.logineUser)
router.post("/forgot-password", userController.forgotPassword)
router.post("/reset-password/:token", userController.resetPassword)
router.post("/logout", userController.logoutUser)

module.exports = router

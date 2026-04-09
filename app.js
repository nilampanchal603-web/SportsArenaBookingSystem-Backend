const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
require("dotenv").config()

//load env file...
// const dotenv=require("dotenv")
// dotenv.config()

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const productRouter = require("./src/routes/ProductRouter")
app.use("/product", productRouter)

const categoryRouter = require("./src/routes/CategoryRouter")
app.use("/category", categoryRouter)

const userRouter = require("./src/routes/UserRoutes")
app.use("/user", userRouter)

const authRouter = require("./src/routes/AuthRoutes")
app.use("/auth", authRouter)
const adminRouter = require("./src/routes/AdminRoutes")
app.use("/admin", adminRouter)

const stateRouter = require("./src/routes/StateRouts")
app.use("/state", stateRouter)

const cityRouter = require("./src/routes/CityRoutes")
app.use("/city", cityRouter)

const slotRouter = require("./src/routes/SlotRouts")
app.use("/slot", slotRouter)

const paymentRoute = require("./src/routes/PaymentRouts")
app.use("/payment", paymentRoute)

const maintenanceRouter = require("./src/routes/MaintenanceRouts")
app.use("/maintenance", maintenanceRouter)

const feedbackRouter = require("./src/routes/FeedbackRoutes")
app.use("/feedback", feedbackRouter)

const bookingRouter = require("./src/routes/BookingRoutes")
app.use("/booking", bookingRouter)

const arenaRouter = require("./src/routes/ArenaRoutes")
app.use("/arena", arenaRouter)

const coachRouter = require("./src/routes/CoachRoutes")
app.use("/coach", coachRouter)

const sessionRouter = require("./src/routes/MySessionRoutes")
app.use("/mysession", sessionRouter)

const avalibalityRouter = require("./src/routes/AvailabalityRouter")
app.use("/avalable", avalibalityRouter)

const requestRouter=require("./src/routes/RequestCoachRouter")
app.use("/request",requestRouter)

const earningRouter=require("./src/routes/CoachEarningRouter")
app.use("/earning",earningRouter)

const { createDefaultAdminIfMissing } = require("./src/controllers/AdminController")
createDefaultAdminIfMissing().catch((error) => {
    console.log("default admin creation failed", error)
})


//serverload
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
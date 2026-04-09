const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || "secret"

const buildTokenPayload = (user) => ({
    id: user._id,
    email: user.email,
    role: user.role
})




const registerUser = async (req, res) => {
    try {
        const requestedRole = req.body.role === "players" ? "player" : req.body.role
        const [firstNameFromName = "", ...restName] = (req.body.name || "").trim().split(" ")
        const lastNameFromName = restName.join(" ")
        const firstName = req.body.firstName || firstNameFromName
        const lastName = req.body.lastName || lastNameFromName || "User"

        //check email alredy exist
        const existingUser = await userSchema.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })

        }
        //  check password already used by another user
        const allUsers = await userSchema.find()

        for (let user of allUsers) {
            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if (isMatch) {
                return res.status(400).json({
                    message: "Passwords must be unique"
                })
            }
        }



        const hashPassword = await bcrypt.hash(req.body.password, 10)
        // const saveUser=await userSchema.create(req.body)
        const saveUser = await userSchema.create({
            ...req.body,
            firstName,
            lastName,
            role: requestedRole,
            password: hashPassword
        })
        //send mail...
        // await mailSend(saveUser.email,"Welcom to app","Thank you for registering with our app")
        // HTML file read
        let html = fs.readFileSync(path.join(__dirname, "../templates/welcome.html"), "utf8")
        // name replace
        html = html.replace("{{name}}", saveUser.firstName)
        // email send
         mailSend(saveUser.email, "Welcome Email", html, [{ filename: "logo.png", path: path.join(__dirname, "../templates/logo.png"), cid: "logo" }])
        //await mailSend(saveUser.email, "Welcome Email", html, [{ filename: "logo.png", path: path.join(__dirname, "../templates/logo.png"), cid: "logo" }])
        res.status(201).json({
            message: "user created successfully",
            data: saveUser
        })

    } catch (err) {
        res.status(500).json({
            message: "error while creating user",
            err: err
        })
    }
};
const logineUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const foundUserFormEmail = await userSchema.findOne({ email: email })
         console.log("Login user email:", foundUserFormEmail?.email)
        console.log(foundUserFormEmail)
        if (foundUserFormEmail) {
            const isPaawordMatch = await bcrypt.compare(password, foundUserFormEmail.password)
            if (isPaawordMatch) {
                //when user is authenticated...we will genaret token...
                const token = jwt.sign(buildTokenPayload(foundUserFormEmail), secret, { expiresIn: "1d" })

                // Send styled login alert email (non-blocking for auth flow)
                try {
                    let loginHtml = fs.readFileSync(path.join(__dirname, "../templates/login-success.html"), "utf8")
                    loginHtml = loginHtml.replace("{{name}}", foundUserFormEmail.firstName || "User")
                    loginHtml = loginHtml.replace("{{email}}", foundUserFormEmail.email)
                    loginHtml = loginHtml.replace("{{time}}", new Date().toLocaleString())
                     mailSend(foundUserFormEmail.email, "Successful Login Alert", loginHtml, [{ filename: "logo.png", path: path.join(__dirname, "../templates/logo.png"), cid: "logo" }])
                    //  awite  mailSend(foundUserFormEmail.email, "Successful Login Alert", loginHtml, [{ filename: "logo.png", path: path.join(__dirname, "../templates/logo.png"), cid: "logo" }])
                } catch (mailError) {
                    console.log("Login mail send failed:", mailError?.message || mailError)
                }

                res.status(200).json({
                    message: "logine successfully",
                    token: token,
                    role: foundUserFormEmail.role,
                    user: {
                        id: foundUserFormEmail._id,
                        email: foundUserFormEmail.email,
                        firstName: foundUserFormEmail.firstName,
                        lastName: foundUserFormEmail.lastName
                    }

                })

            }
            else {
                //401-unathorized
                res.status(401).json({
                    message: "invalid password"
                })
            }

        }
        else {
            res.status(404).json({
                message: "user not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "error while logging in",
            err: error
        })

    }

}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }

        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: "If this email exists, reset link sent." })
        }

        const resetToken = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
        user.resetPasswordToken = hashedToken
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000
        await user.save()

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`

        let html = fs.readFileSync(path.join(__dirname, "../templates/forgot-password.html"), "utf8")
        html = html.replace("{{name}}", user.firstName || "User")
        html = html.replace("{{resetUrl}}", resetUrl)
        await mailSend(user.email, "Reset your password", html, [{ filename: "logo.png", path: path.join(__dirname, "../templates/logo.png"), cid: "logo" }])

        return res.status(200).json({ message: "Reset password link sent to email." })
    } catch (error) {
        return res.status(500).json({
            message: "error while processing forgot password",
            err: error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password, confirmPassword } = req.body

        if (!password || !confirmPassword) {
            return res.status(400).json({ message: "password and confirmPassword are required" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "passwords do not match" })
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const user = await userSchema.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "token is invalid or expired" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
        user.resetPasswordToken = null
        user.resetPasswordExpire = null
        await user.save()

        return res.status(200).json({ message: "password reset successfully" })
    } catch (error) {
        return res.status(500).json({
            message: "error while resetting password",
            err: error
        })
    }
}

const logoutUser = async (req, res) => {
    return res.status(200).json({ message: "logout successful" })
}

module.exports = { registerUser, logineUser, forgotPassword, resetPassword, logoutUser }
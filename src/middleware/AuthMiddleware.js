const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || "secret"

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            //token Bearer token
            if (token.startsWith("Bearer ")) {
                //remove bearer from token
                const tokenValue = token.split(" ")[1]
                //verifytoken using jwt
                const decodedData = jwt.verify(tokenValue, secret)
                req.user = decodedData
                next()
            } else {
                res.status(401).json({
                    message: "token is not Bearer token"
                })
            }
        }
        else {
            res.status(401).json({
                message: "token is not present.."
            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error While validating token",
            err: error
        })
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user?.role) {
            return res.status(401).json({ message: "unauthorized user" })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "forbidden: role not allowed" })
        }
        next()
    }
}

module.exports = { validateToken, authorizeRoles }
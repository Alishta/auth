const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()
const { loginRouter, bearerSecret, expiryTime, tokensArr, refreshSecret } = require("../routes/login")

router.get("/", verifyBearerToken, (req, res) => {
    res.status(200).send("Authorization successful!")
})

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 */
function verifyBearerToken(req, res, next) {
    const token = req.headers["authorization"] 

    if (!token) {
        return res.status(401).json({ error: "Bearer token is required" })
    }

    jwt.verify(token, bearerSecret, (err, decoded) => {

        if (err) {
            return res.status(403).json({ error: "Invalid bearer token" })
        } 
        req.user = decoded

        next()
    })
}

module.exports = { pathRouter: router }

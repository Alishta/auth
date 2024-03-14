const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()
const { loginRouter, bearerSecret, expiryTime, tokensArr, refreshSecret } = require("../routes/login")


router.post("/", (req, res) => {
  const refreshToken = req.body.refreshBearerToken

  if (!refreshToken || !tokensArr.includes(refreshToken)) {
    return res.status(401).json({ error: "Refresh token is missing or invalid" })
  }

  jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" })
    }

    const newBearerToken = jwt.sign({ fullName: decoded.fullName }, bearerSecret, {
      expiresIn: expiryTime,
    })

    res.json({ newBearerToken })
  })
})

module.exports = router

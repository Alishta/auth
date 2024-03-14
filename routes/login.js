const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

const [bearerSecret, refreshSecret] = ["qwerty", "ytrewq"]
const expiryTime = "10m"
const tokensArr = []


router.post("/", (req, res) => {

  const { fullName } = req.body
  const bearerToken = jwt.sign({ fullName }, bearerSecret, { expiresIn: expiryTime })
  const refreshBearerToken = jwt.sign({ fullName }, refreshSecret)
  tokensArr.push(refreshBearerToken)

  res.json({ bearerToken, refreshBearerToken })
})

module.exports = { loginRouter: router, bearerSecret: bearerSecret, expiryTime: expiryTime, tokensArr: tokensArr, refreshSecret: refreshSecret }

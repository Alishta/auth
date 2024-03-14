const express = require("express")
const app = express()
const port = process.env['APP_PORT'] || 3000

const { loginRouter, bearerSecret, expiryTime, tokensArr } = require("./routes/login")
const refreshTokenRouter = require("./routes/refresh-token")
const { pathRouter, verifyBearerToken } = require("./routes/path")

app.use(express.json())

app.use("/login", loginRouter)
app.use("/refresh-token", refreshTokenRouter)
app.use("/path", pathRouter)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})


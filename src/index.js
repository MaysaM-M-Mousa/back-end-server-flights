const express = require('express')
const cors = require('cors')
const applicationRouter = require('./routes/flight')
const userRouter = require('./routes/user')
const predictionRouter = require('./routes/prediction')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(applicationRouter)
app.use(userRouter)
app.use(predictionRouter)

app.listen(PORT, () => {
    console.log("Express server is up and running on port " + PORT)
})
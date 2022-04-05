const express = require('express')
const applicationRouter = require('./routes/flight')

const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(applicationRouter)

app.listen(PORT, () => {
    console.log("Express server is up and runnin on port " + PORT)
})
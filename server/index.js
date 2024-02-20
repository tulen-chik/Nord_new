require("dotenv").config()
const express = require('express')
const bodyParser = require("body-parser")

const route = require("./routes/index")
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/api", route)

app.use(errorHandlerMiddleware)

async function start() {
    try {
        app.listen(process.env.PORT, () => console.log(`http://${process.env.HOST}${process.env.PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()
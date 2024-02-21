require("dotenv").config()
const path = require("path")
const cors = require("cors")
const express = require('express')
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const route = require("./routes/index")
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware")

const app = express()

app.use(cors) //я не знаю, для чего это надо

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())

app.use(express.static(path.resolve(__dirname, "static")))

app.use("/api", route)

app.use(errorHandlerMiddleware)

async function start() {
    try {
        app.listen(process.env.PORT, () => console.log(`http://${process.env.HOST}:${process.env.PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()
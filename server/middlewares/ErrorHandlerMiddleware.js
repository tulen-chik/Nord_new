const apiError = require("../errors/ApiError")

module.exports = (error, req, res, next) => {
    if (error instanceof apiError)
        return res.status(error.status).json({message: error.message})
    return res.status(500).json("непредвиденная ошибка")
}
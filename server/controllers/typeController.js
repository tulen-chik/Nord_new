const { Type } = require("../models/models")
const ApiError = require("../errors/ApiError")

class typeController {
    static async create(req, res, next) {
        const { name } = req.query
        if (!name)
            return next(ApiError.badRequest("не введено название категории"))
        return res.json(await Type.create({ name }))
    }

    static async get(req, res, next) {
        const { id } = req.query
        if (!id)
            return res.json(await Type.findAll())
        const category = await Type.findOne({ where: { id } })
        return category ? res.json({ category }) : next(ApiError.badRequest("категория не была найдена"))
    }
}

module.exports = typeController
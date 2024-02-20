const { Product } = require("../models/models")
const ApiError = require("../errors/ApiError")

class userController {
    static async create(req, res, next) {

    }

    static async getAll(req, res, next) {
        let { page, categoryId, typeId } = req.query
        page = page || 1
        const limit = 9
        const offset = page * limit - limit
        let products
        if (categoryId && typeId)
            products = await Product.findAll({where: { categoryId, typeId }, offset, limit})
        if (typeId)
            products = await Product.findAll({where: { typeId }, offset, limit})
        if (categoryId)
            products = await Product.findAll({where: { categoryId }, offset, limit})
        products = await Product.findAll({ offset, limit})
        return res.json(products)
    }

    static async getOne(req, res, next) {
        const { id } = req.params
        if (!id)
            return next(ApiError.badRequest("не задан айди товара"))
        const product = await Product.findOne({ where: { id } })
        if (!product)
            return next(ApiError.badRequest("нет такого товара"))
        return res.json(product)
    }
}

module.exports = userController
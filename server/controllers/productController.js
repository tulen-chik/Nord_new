const path = require("path")
const uuid = require("uuid")
const { Product } = require("../models/models")
const ApiError = require("../errors/ApiError")

class productController {
    static async create(req, res, next) {
        try {
            const { name, price, description, categoryId, typeId, quantity } = req.body
            const { image } = req.files
            const filename = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, "..", "static", filename))

            const product = await Product.create({ name, price, description, categoryId, typeId, quantity, image: filename })
            return res.json(product)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    static async getAll(req, res, next) {
        let { page, categoryId, typeId } = req.query
        page = page || 1
        const limit = 9
        const offset = page * limit - limit
        let products
        if (!categoryId && !typeId)
            products = await Product.findAll({ offset, limit })
        else if (!typeId)
            products = await Product.findAll({ where: { categoryId }, offset, limit })
        else if (!categoryId)
            products = await Product.findAll({ where: { typeId }, offset, limit })
        else
            products = await Product.findAll({ where: { categoryId, typeId }, offset, limit })
        return products == [] ? res.json(products) : next(ApiError.badRequest("нет таких товаров"))
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

module.exports = productController
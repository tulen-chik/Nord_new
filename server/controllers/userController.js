const User = require("../models/models")

class userController {
    static async login(req, res, next) {

    }

    static async registration(req, res, next) {

    }

    static async auth(req, res, next) {
        return res.json({message: "xui"})
    }
}

module.exports = userController
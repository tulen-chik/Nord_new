const Router = require("express")
const controller = require("../controllers/userController")

const route = new Router();

route.post("/login", controller.login)
route.post("/registration", controller.registration)
route.get("/auth", controller.auth)

module.exports = route;
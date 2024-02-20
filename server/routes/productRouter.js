const Router = require("express")
const controller = require("../controllers/productController")

const route = new Router();

route.post("/", controller.create)
route.get("/", controller.getAll)
route.get("/:id", controller.getOne)

module.exports = route;
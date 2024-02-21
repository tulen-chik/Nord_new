const { Router } = require("express")
const controller = require("../controllers/typeController")

const router = Router()

router.post("/", controller.create)
router.get("/", controller.get)

module.exports = router
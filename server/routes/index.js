const Router = require("express")

const userRouter = require("./userRouter")
const productRouter = require("./productRouter")
const categoryRouter = require("./categoryRouter")
const typeRouter = require("./typeRouter")

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/category", categoryRouter)
router.use("/type", typeRouter)

module.exports = router
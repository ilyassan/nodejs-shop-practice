const router = require("express").Router()
const productController = require("../controllers/product.controller")

router.get("/",productController.reBackToHome)
router.get("/:id",productController.getProduct)

module.exports = router
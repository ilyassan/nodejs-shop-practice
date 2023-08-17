const router = require("express").Router()
const bodyParser = require("body-parser")
const bodyParserMW = bodyParser.urlencoded({extended:true})
const authGaurd = require("./guarde/auth.guarde")
const check = require("express-validator").check

const ordersController = require("../controllers/orders.controller")



router.get("/",authGaurd.isAuth,ordersController.getOrders)
router.post("/",bodyParserMW,check("address","address is required").not().isEmpty(),ordersController.addOrder)

router.post("/cancel",bodyParserMW,ordersController.deleteOrder)

router.post("/cancelAll",bodyParserMW,ordersController.deleteAllOrders)




module.exports = router
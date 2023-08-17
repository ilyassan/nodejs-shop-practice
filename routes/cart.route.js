const router = require("express").Router()
const bodyParser = require("body-parser")
const bodyParserMW = bodyParser.urlencoded({extended:true})
const authGaurd = require("./guarde/auth.guarde")
const check = require("express-validator").check

const cartController = require("../controllers/cart.controller")



router.get("/",authGaurd.isAuth,cartController.getCarts)

router.post("/",
authGaurd.isAuth,
    bodyParserMW,
    check("amount","amount is required").not().isEmpty().isInt({min:1}).withMessage("amount must be greater than 0"),
    cartController.postCart
    )


router.post("/save",
    bodyParserMW,
    check("amount","amount is required").not().isEmpty().isInt({min:1}).withMessage("amount must be greater than 0"),
    cartController.editItem)
router.post("/delete",bodyParserMW,cartController.deleteItem)

router.post("/deleteAll",bodyParserMW,cartController.deleteAllItems)

router.post("/verifyOrder/:id",authGaurd.isAuth,cartController.postAddress)
router.get("/verifyOrder/:id",authGaurd.isAuth,cartController.getAddress)
router.get("/verifyOrder",cartController.reBackToCart)

router.all("/verifyAllOrders",authGaurd.isAuth,cartController.getAddressOfAllOrders)


module.exports = router

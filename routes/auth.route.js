const router = require("express").Router()
const bodyParser = require("body-parser")
const bodyParserMW = bodyParser.urlencoded({extended:true})
const check = require("express-validator").check

const authGuardes = require("./guarde/auth.guarde")

const authController = require("../controllers/auth.controller")

router.get("/signup",authGuardes.notAuth,authController.getSignup)

router.post(
    "/signup",
    bodyParserMW,
    authGuardes.notAuth,
    check("username","please enter your username").not().isEmpty(),
    check("email","invalid format").not().isEmpty().withMessage("email is required").isEmail(),
    check("password","6 charachter at least in password").not().isEmpty().withMessage("password is required").isLength({min:6}),
    check("confirmPassword").not().isEmpty().withMessage("please confirm your password").custom((value,{req})=>{
        if(value ==  req.body.password)return true
        else throw "passwords didn't matches"
    }),
    authController.postSignup)

router.get("/login",authGuardes.notAuth,authController.getLogin)

router.post(
    "/login",
    authGuardes.notAuth,
    bodyParserMW,
    check("email","invalid format").not().isEmpty().withMessage("email is required").isEmail(),
    check("password","password is required").not().isEmpty(),
    authController.postLogin)

router.all("/logout",authGuardes.isAuth,authController.logout)

module.exports = router
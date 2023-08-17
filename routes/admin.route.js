const router = require("express").Router()
const check = require("express-validator").check
const multer = require("multer")
const bodyParser = require("body-parser")
const bodyParserMW = bodyParser.urlencoded({extended:true})

const adminController = require("../controllers/admin.controller")
const adminGaurde = require("./guarde/admin.gaurde")


router.get("/add",adminGaurde,adminController.getAdd)
router.post("/add",adminGaurde,
multer({
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,"images")
        },
        filename: (req,file,cb)=>{
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
}).single("image"),
check("image").custom((value,{req})=>{
    if(req.file) return true
    else throw "image is required"
}),
check("name","the name of product is required").notEmpty(),
check("price","the price of product is required").notEmpty(),
check("description","the description of product is required").notEmpty(),
check("category","please select a category").not().equals("0"),
adminController.postAdd)

router.get("/manage-orders",adminGaurde,adminController.getManage)
router.post("/manage-orders",bodyParserMW,
check("userEmail","Please Enter The Email User Before Search").not().isEmpty().isEmail().withMessage("Invalid Email Format")
,adminGaurde,adminController.getOrdersOfUser)

router.post("/manage-orders/save",bodyParserMW,adminGaurde,adminController.saveUpdate)

router.post("/manage-orders/pending-orders",adminGaurde,adminController.getPendings)
router.post("/manage-orders/sent-orders",adminGaurde,adminController.getSents)
router.post("/manage-orders/completed-orders",adminGaurde,adminController.getCompleted)

module.exports = router
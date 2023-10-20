const express = require("express");
const path = require("path")

const session = require("express-session")
const SessionStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")

const homeRouter = require("./routes/home.route")
const productRouter = require("./routes/product.route")
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route")
const ordersRouter = require("./routes/orders.route")
const adminRouter = require("./routes/admin.route")

const app = express();


app.use(express.static(path.join(__dirname,"assets")))
app.use(express.static(path.join(__dirname,"images")))
app.use(flash())

const STORE = new SessionStore({
    uri: "mongodb://localhost:27017",
    collection: "sessions"
})


app.use(session({
    secret: "this is my colbacnid4 to hash express... .",
    saveUninitialized: false,
    store: STORE,
    resave:false
}))

app.set("view engine","ejs")
app.set("views","views")


app.use("/",homeRouter)
app.use("/",authRouter)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/orders",ordersRouter)
app.use("/admin",adminRouter)

app.get("/error",(req,res,next)=>{
    res.status(500)
    res.render("error.ejs",{
        isUser : req.session.isUser,
        isAdmin : req.session.isAdmin
    })
})
app.get("/not-admin",(req,res,next)=>{
    res.status(403)
    res.render("not-admin",{
        isUser : req.session.isUser,
        isAdmin : false,
        pageTitle: "Not Admin"
    })
})

app.use((req,res,next)=>{
    res.status(404)
    res.render("not-found",{
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    })
})


let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server is listen in 3000");
})
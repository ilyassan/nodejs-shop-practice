const productsModule = require("../models/products.module")

exports.getProduct = (req,res,next)=>{
    // get id
    // get product
    // render
    let id = req.params.id;
    productsModule.getProductById(id).then(product =>{
        res.render("product",{
            product:product,
            isUser: req.session.userId,
            validationError:req.flash("validationErrors")[0],
            isAdmin: req.session.isAdmin,
            pageTitle:"Product Details"
        })
    })
}
exports.reBackToHome = (req,res,next)=>{
    res.redirect("/")
}
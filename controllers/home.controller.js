const productsModel = require("../models/products.module")




exports.getHome = (req,res,next)=>{
    
    
    // get category
    // if category != all
    // else render all

    let category = req.query.category
    let validCategories = ["devices","games","books"]
    let productsPromise;
    
    if(category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts()
    
    // get products
    // render index.ejs
    productsPromise.then((products)=>{
        res.render("index",{
            products:products,
            category:category,
            isUser: req.session.userId,
            validationError:req.flash("validationErrors")[0],
            isAdmin: req.session.isAdmin,
            pageTitle:"Home"
        })
    })
    
}
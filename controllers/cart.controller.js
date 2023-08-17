const cartModel = require("../models/cart.model")
const validationResult = require("express-validator").validationResult


exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name:req.body.name,
            price:req.body.price,
            amount:req.body.amount,
            productId:req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        },req.session.userId).then(()=>{
            res.redirect("/cart")
        }).catch(err =>{
             res.redirect("/error")
        })
    }else{
        req.flash("validationErrors",validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.getCarts = (req,res,next)=>{
    cartModel.getItemsByUser(req.session.userId)
    .then(cartItems=>{
        res.render("cart",{
            cartItems:cartItems,
            isUser:true,
            validationError: req.flash("validationErrors")[0],
            isAdmin: req.session.isAdmin,
            pageTitle:"Cart"
        })
    })
    .catch(err => {
        res.redirect("/error")
    })
}



exports.editItem = (req,res,next)=>{
    

    if(validationResult(req).isEmpty()){
        cartModel.updateItem(req.body.cartId,req.body.amount)
        .then(()=>{
            res.redirect("/cart")
        }).catch(err =>{
           res.redirect("/error")
        })
    }else{
        req.flash("validationErrors",validationResult(req).array())
        res.redirect("/cart")
    }
}
exports.deleteItem = (req,res,next)=>{
    
    cartModel.deleteItem(req.body.cartId)   
    .then(()=>{
        res.redirect("/cart")
   })
   .catch((err)=>{
        res.redirect("/error")
   })
}

exports.deleteAllItems = (req,res,next)=>{
    cartModel.deleteAllItem(req.session.userId)
    .then(()=>{
         res.redirect("/cart")
    })
    .catch((err)=>{
        res.redirect("/error")
    })
}


exports.reBackToCart = (req,res,next)=>{
    res.redirect("/cart")
}


exports.getAddress = (req,res,next)=>{

    cartModel.getOneItemById(req.params.id)
    .then(item =>{
        res.render("address",{
            isUser:true,
            isAdmin:req.session.isAdmin,
            itemId:req.params.id,
            item: JSON.stringify(item),
            validationError: req.flash("validationErrors")[0],
            pageTitle:"Set Address"
        })
    }).catch(err =>{
        res.redirect("/cart")
    })

}
exports.postAddress = (req,res,next)=>{
    res.redirect("/cart/verifyOrder/"+req.params.id)
}


exports.getAddressOfAllOrders = (req,res,next)=>{
    cartModel.getItemsByUser(req.session.userId)
    .then(cartItems=>{
        if(cartItems.length > 0){
            res.render("address",{
                isUser:true,
                itemId:0,
                isAdmin:req.session.isAdmin,
                item:JSON.stringify(cartItems),
                validationError: req.flash("validationErrors")[0]
            })
        }else{
            res.redirect("/cart")
        }
    })
    .catch(err =>{
        res.redirect("/error")
    })
}
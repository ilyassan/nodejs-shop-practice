const ordersModel = require("../models/orders.model")
const cartModel = require("../models/cart.model")
const validationResult = require("express-validator").validationResult

exports.addOrder = (req,res,next)=>{

    let cartId = req.body.cartId
    
    if(validationResult(req).isEmpty()){
        let cartItem = JSON.parse(req.body.cart)
        let userId = req.session.userId
        let address = req.body.address

        let itemsOrItem = formatObjectsToArray(cartItem,cartId,userId,address)


        ordersModel.addOrder(itemsOrItem,cartId).then(()=>{   
            if(cartId == 0){
                cartModel.deleteAllItem(req.session.userId)
            }else{
                cartModel.deleteItem(cartItem._id)
            }
            res.redirect("/orders")
        }).catch(err =>{
            res.redirect("/error")
        })


    }else{
        if(cartId == 0){
            req.flash("validationErrors",validationResult(req).array())
            res.redirect("/cart/verifyAllOrders")
        }else{
            req.flash("validationErrors",validationResult(req).array())
            res.redirect("/cart/verifyOrder/" + req.body.cartId)
        }
    }
}

exports.getOrders = (req,res,next)=>{
    ordersModel.getOrders(req.session.userId)
    .then(items=>{
        res.render("orders",{
            orderItems: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle:"Orders"
        })
    }).catch(err=>{
        res.redirect("/error")
    })
}

exports.deleteOrder = (req,res,next)=>{
    
    ordersModel.deleteOrder(req.body.orderId)   
    .then(()=>{
        res.redirect("/orders")
   })
   .catch((err)=>{
       res.redirect("/error")
   })
}

exports.deleteAllOrders = (req,res,next)=>{
    ordersModel.deleteAllOrders(req.session.userId)
    .then(()=>{
         res.redirect("/orders")
    })
    .catch((err)=>{
        res.redirect("/error")
    })
}



function formatObjectsToArray(items,cartId,userId,address){
    if(cartId == 0){
        let arr = []
        for(let item of items){
            arr.push({
                name: item.name,
                price: item.price,
                amount: item.amount,
                userId: userId,
                productId: item.productId,
                address: address,
                status:"Pending",
                time: Date.now(),
                timestamp: item.timestamp
            })
        
        }
        return arr
    }else{
        return {
            name: items.name,
            price: items.price,
            amount: items.amount,
            userId: userId,
            productId: items.productId,
            address: address,
            status:"Pending",
            time: Date.now(),
            timestamp: items.timestamp
        }
    }
}
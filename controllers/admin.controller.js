const validationResult = require("express-validator").validationResult
const productModel = require("../models/products.module")
const ordersModel = require("../models/orders.model")
const authModel = require("../models/auth.model")


exports.getAdd = (req,res,next)=>{
    res.render("add-product",{
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        pageTitle:"Add Product"
    })
}

exports.postAdd = (req,res,next)=>{
    if(validationResult(req).isEmpty()){

     productModel.adminAddnewProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file.filename
     })
     .then(()=>{
        res.redirect("/")
     }).catch(err=>{
        res.redirect("/error")
     })
     
    }else{
        req.flash("validationErrors",validationResult(req).array())
        res.redirect("/admin/add")
    }
}


exports.getManage = (req,res,next)=>{
    ordersModel.getOrders("all")
    .then((items)=>{
        res.render("manage-orders",{
            validationErrors: req.flash("validationErrors")[0],
            isUser : true,
            isAdmin: req.session.isAdmin,
            orderItems: items,
            notFound: false,
            status: "Orders",
            pageTitle:"Manage Orders"
        })
    }).catch(err=>{
        res.redirect("/error")
    })
}


exports.saveUpdate = (req,res,next)=>{
    let status = req.body.wStatus
    let id = req.body.orderId
    ordersModel.adminUpdateStatus(id,status)
    .then(()=>{
        res.redirect("/admin/manage-orders")
    }).catch(err=>{
        res.redirect("/error")
    })
}


exports.getPendings =  (req,res,next)=>{
    ordersModel.getOrdersByStatus("Pending")
    .then((items)=>{
        res.render("manage-orders",{
            isUser : true,
            isAdmin: req.session.isAdmin,
            orderItems: items,
            notFound: false,
            validationErrors: req.flash("validationErrors")[0],
            status:"Pendings",
            pageTitle:"Manage Orders"
        })
    }).catch(err=>{
        res.redirect("/error")
    })
}
exports.getSents =  (req,res,next)=>{
    ordersModel.getOrdersByStatus("Sent")
    .then((items)=>{
        res.render("manage-orders",{
            isUser : true,
            isAdmin: req.session.isAdmin,
            orderItems: items,
            notFound: false,
            validationErrors: req.flash("validationErrors")[0],
            status:"Sent",
            pageTitle:"Manage Orders"
        })
    }).catch(err=>{
        res.redirect("/error")
    })
}
exports.getCompleted =  (req,res,next)=>{
    ordersModel.getOrdersByStatus("Completed")
    .then((items)=>{
        res.render("manage-orders",{
            isUser : true,
            isAdmin: req.session.isAdmin,
            orderItems: items,
            notFound: false,
            validationErrors: req.flash("validationErrors")[0],
            status:"Completed",
            pageTitle:"Manage Orders"
        })
    }).catch(err=>{
        res.redirect("/error")
    })
}



exports.getOrdersOfUser = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        authModel.getUserIdByEmail(req.body.userEmail)
        .then((id)=>{
            if(id){
                ordersModel.getOrders(id).then((items)=>{
                    res.render("manage-orders",{
                        isUser : true,
                        isAdmin: req.session.isAdmin,
                        orderItems: items,
                        validationErrors: req.flash("validationErrors")[0],
                        notFound: false,
                        status:false,
                        pageTitle:"Manage Orders"
                    })
                }).catch(err =>{
                     res.redirect("/error")
                })
            }else{
                res.render("manage-orders",{
                    isUser : true,
                    isAdmin: req.session.isAdmin,
                    orderItems: [],
                    validationErrors: req.flash("validationErrors")[0],
                    notFound: true,
                    status:false,
                    pageTitle:"Manage Orders"
                })
            }
        })
        .catch(err=>{
            res.redirect("/error")
        })
    }else{
        req.flash("validationErrors",validationResult(req).array())
        res.redirect("/admin/manage-orders")
    }
}
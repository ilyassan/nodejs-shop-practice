const mongoose = require("mongoose")

const DB_URL = "mongodb://localhost:27017"

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
})

const Product = mongoose.model("product",productSchema)

exports.adminAddnewProduct = (data)=>{
    
    // connect to database
    // add newProducts
    // disconnect

    return new Promise((resolve,rejected)=>{
        mongoose.connect(DB_URL).then(()=>{
            let item = new Product(data)
            return item.save()
            }).then(() =>{
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                rejected(err)
            })})

}

exports.getAllProducts = ()=>{
    
    // connect to database
    // get products
    // disconnect

    return new Promise((resolve,rejected)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find()
            }).then(products =>{
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                rejected(err)
            })})

}

exports.getProductsByCategory = (category)=>{
    
    // connect to database
    // get products by category
    // disconnect

    return new Promise((resolve,rejected)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category:category})
            }).then(products =>{
                mongoose.disconnect()
                resolve(products)
            }).catch(err =>{
                mongoose.disconnect()
                rejected(err)
            })})

}


exports.getProductById = (id)=>{
        // connect to database
    // get products by category
    // disconnect

    return new Promise((resolve,rejected)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findById(id)
            }).then(products =>{
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                rejected(err)
            })})
}
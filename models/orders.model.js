const mongoose = require("mongoose")

const DB_URL = "mongodb://localhost:27017"

const orderSchema = {
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    address: String,
    status: String,
    time: Number,
    timestamp: Number
}

const OrderItem = mongoose.model("order",orderSchema)



exports.addOrder = (data,cartId) =>{
    return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL)
        .then(()=>{
            let promises = []
            if(cartId == 0){
                for(let citem of data){
                    let item = new OrderItem(citem)
                    promises.push(item.save())
                }
            }else{
                let item = new OrderItem(data)
                promises.push(item.save())
            }
            return Promise.all(promises)
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOrders = userId =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           if(userId == "all"){
                 return OrderItem.find({},{},{sort:{timestamp:-1}})
           }else{
                 return OrderItem.find({userId: userId},{},{sort:{timestamp:-1}})
           }
        })
        .then(items=>{
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
     })
}

exports.deleteOrder = id =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return OrderItem.deleteOne({_id:id,status:"Pending"})
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.deleteAllOrders = userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return OrderItem.deleteMany({userId: userId,status:"Pending"})
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.adminUpdateStatus = (id,status) =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return OrderItem.findByIdAndUpdate(id,{status:status})
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
     })
    }




    exports.getOrdersByStatus = (status) =>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL)
            .then(()=>{
                     return OrderItem.find({status: status},{},{sort:{timestamp:1}})
            })
            .then(items=>{
                mongoose.disconnect()
                resolve(items)
            })
            .catch(err =>{
                mongoose.disconnect()
                reject(err)
            })
         })
    }
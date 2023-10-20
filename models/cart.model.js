const mongoose = require("mongoose")

const DB_URL = "mongodb://localhost:27017

const cartSchema = {
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
}

const CartItem = mongoose.model("cart",cartSchema)

exports.addNewItem = (data,id)=>{
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL)
        .then(() => {
            return CartItem.findOne({ productId: data.productId, userId: id }).exec();
        })
        .then(item => {
            if (item) {
                let result = item.amount
                item.amount = parseInt(data.amount) + parseInt(result);
                return item.save();
            } else {
                let item = new CartItem(data);
                return item.save();
            }
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


exports.getItemsByUser = userId=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
           return CartItem.find({userId: userId},{},{sort:{timestamp:1}})
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


exports.updateItem = (id,amount) =>{
    return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL)
        .then(()=>{
            return CartItem.findOneAndUpdate({_id:id},{amount:amount})
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

exports.deleteItem = id =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return CartItem.deleteOne({_id:id})
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

exports.deleteAllItem = userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return CartItem.deleteMany({userId: userId})
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


exports.getOneItemById = itemId=>{
    return new Promise((resolve,reject)=>{
       mongoose.connect(DB_URL)
       .then(()=>{
          return CartItem.findOne({_id: itemId})
       })
       .then(item=>{
           mongoose.disconnect()
           resolve(item)
       })
       .catch(err =>{
           mongoose.disconnect()
           reject(err)
       })
    })
}
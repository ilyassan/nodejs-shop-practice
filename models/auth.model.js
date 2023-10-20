const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const DB_URL = "mongodb://localhost:27017"

const userSchema = {
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}

const User = mongoose.model("user",userSchema)

exports.createNewUser = (username,email,password)=>{

    // check if email exists
    // yes => error is exists
    // no => create new account

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if(user){
            mongoose.disconnect()
             reject("email is already used")
            }else{
                return bcrypt.hash(password,10)
            }
        }).then(hashedPassword =>{
            let user = new User({
                username:username,
                email:email,
                password:hashedPassword
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}


exports.login = (email,password)=>{


    // check if email already using
    // no ==> error
    // yes ==> check password is correct
    // no ==> error
    // yes ==> set ssesion

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=> User.findOne({email:email})).then(user=>{
            if(!user){
                mongoose.disconnect()
                reject("email not found")
            }else{
                bcrypt.compare(password,user.password).then(same =>{
                    if(!same){
                        mongoose.disconnect()
                        reject("password is incorrect")
                    }else{
                        mongoose.disconnect()
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })

}


exports.getUserIdByEmail = email=>{


    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=> User.findOne({email:email}))
        .then(user=>{
            mongoose.disconnect()
            if(user){
                resolve(user._id)
            }else{
                resolve(false)
            }
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })


}
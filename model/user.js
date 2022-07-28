const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullname:{type:String,required:true,minlength:4,maxlength:44},
    email:{type:String,required:true,unique:true,minlength:4,maxlength:255},
    password:{type:String,required:true,minlength:8,maxlength:1024},
    isAdmin:Boolean
});
userSchema.methods.generateTokens=function () {
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},'privatekey')  
    return token; 
}
const User = mongoose.model('User', userSchema) 

function userValidate(user){
    const schema = Joi.object({
      
        fullname: Joi.string().min(3).max(44).required(),
        email:Joi.string().min(3).max(44).required().email(),
        password:Joi.string().min(8).max(255).required(),
       
    })
    return schema.validate(user);
   
}
exports.User=User;
exports.userValidate=userValidate;
const express = require('express');
const router=express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {User}=require('../model/user')
 const _=require('lodash')
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 router.post('/',async (req,res)=>
 {
  // res.send(req.body)
       const error=validate(req.body);
  
       if(error.error)
          return res.status(404).send(error.error.details[0].message);
       let user=await User.findOne({email:req.body.email});
      
       if(!user)
          return res.send('user email not found');
  // const user=new User({fullname:req.body.fullname,email:req.body.email,password:req.body.password} )
 
    
  
  
     // we can use
  //  user.password= await bcrypt.hash(user.password,saltRounds);
    const checkPassword= await bcrypt.compare(req.body.password,user.password);
    if( !checkPassword)
       return res.send('user  not found');
     
     //res.send(user);
  const token=user.generateTokens();
     res.send(token);
 })
 function validate(req){
    const schema = Joi.object({
        email:Joi.string().min(3).max(44).required().email(),
        password:Joi.string().min(8).max(255).required(),
       
    })
    return schema.validate(req);
   
}
 module.exports=router;
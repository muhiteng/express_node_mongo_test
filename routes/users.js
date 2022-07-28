const express = require('express');
const router=express.Router();
const mongoose = require('mongoose');

const {User,userValidate}=require('../model/user')
 const _=require('lodash')
 const bcrypt = require('bcrypt');
// middleware 
const auth=require('../middleware/auth')
 
router.get('/profile',auth, async (req, res) =>{
   const profile=await User.findById(req.user._id).select('-password');
   res.send(profile)
   })

  
router.post('/',async (req,res)=>
{
 // res.send(req.body)
      const error=userValidate(req.body);
 
      if(error.error)
         return res.status(404).send(error.error.details[0].message);
      let user=await User.findOne({email:req.body.email});
     
      if(user)
         return res.send('email already found');
 // const user=new User({fullname:req.body.fullname,email:req.body.email,password:req.body.password} )
 //using lodash package
   user=new User(_.pick(req.body,['fullname','email','password']))
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
    // we can use
 //  user.password= await bcrypt.hash(user.password,saltRounds);
   user.password= await bcrypt.hash(user.password,salt);

    await user.save();
    //res.send(user);
    const token=user.generateTokens();
    
    res.header('x-auth-token',token).send(_.pick(user,['fullname','email']))
})
module.exports=router;
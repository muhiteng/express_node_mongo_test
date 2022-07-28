const express = require('express');
const { string } = require('joi');
const router=express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
require('express-async-errors');

/*
const employees=[
    {empID:1,fullname:'ahmad',salary:3000},
    {empID:2,fullname:'ali',salary:5000},
    {empID:3,fullname:'abas',salary:2000},
    {empID:4,fullname:'majed',salary:1000}
]

*/
const {Employee,employeeValidate}=require('../model/employee')
// middleware 
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')

router.get('/', async (req, res) =>{
    const employees=await Employee.find().sort('name');
    res.send(employees)
    })
    router.get('/pages', async (req, res) =>{
      const{page=1,limit=10}=req.query
      const employees=await Employee.find()
      .sort('name')
      .limit(limit)
      .skip((page-1)*limit).exec();
      res.send(employees)
      })

    router.get('/api/employees',(req,res)=>
    {

    let arr = employees;
        res.send(arr);
    })
    // params
    //http://localhost:3000/api/employee/4
    // param id = 4
    router.get('/api/employee/:id',async (req,res)=>
    {
      let id=req.params.id;
      const employee=await Employee.findById(id)
      if(! employee)
      res.status(404).send('This employee not found');
        
        res.send(employee);
    })
    // query string
    //http://localhost:3000/api/employee?user_id=ali
    // query string {"user_id":"ali"}
    router.get('/',(req,res)=>
    {
      
        res.send(req.query);
    })
     // body
    //http://localhost:3000/api/employees
    // here we used middleware auth
    router.post('/',auth,async (req,res)=>
    {
       
      const employee=new Employee({
        
        fullname:req.body.fullname,
        salary:req.body.salary
      } )
    //   const erro=employeeValidate(req.body);
      
    //   if(erro)
    //      return res.send(err);
      await employee.save()
        res.send(employee);
    })

    // update employee
    router.put('/:id',async (req,res)=>
    {
      let id=req.params.id;
   
    //   const erro=employeeValidate(req.body);
      
    //   if(erro.error)
    //      return res.send(erro.error);
     const employee=await Employee.findByIdAndUpdate(id,{
        
        fullname:req.body.fullname
     },{new:true})
     
      if(! employee)
         res.status(404).send('This employee not found');
        
        res.send(employee);
    })
    // delete employee
    // here we used middleware auth,admin
    router.delete('/:id',[auth,admin],async (req,res)=>
    {
      let id=req.params.id;
      const employee=await Employee.findByIdAndRemove(id)
     
      
    
        res.send(employee);
    })

    module.exports=router;
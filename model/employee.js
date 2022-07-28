const Joi = require('joi');
const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', new mongoose.Schema({
    fullname:{type:String},
    salary:{type:String}
})) 


function employeeValidate(employee){
    const schema = Joi.object({
      
        fullname: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    salary:Joi.number()
       
    })
    return schema.validate(employee);
   
}

exports.Employee=Employee;
exports.employeeValidate=employeeValidate;








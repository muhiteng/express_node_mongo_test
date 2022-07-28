// Using Node.js `require()`
const { required, func } = require('joi');
const mongoose = require('mongoose');

// Using ES6 imports


// database name employees
 mongoose.connect('mongodb://localhost/employees')
.then(console.log('conected'))
.catch((e)=>console.error('error'+e));


const employeeSchema =new 
mongoose.Schema({
    name:{type : String,required:true,lowercase:true,upercase:false,trim:true},
    age : {type : Number,min:[18,'too small age'],max:65},
    department:{
        type:Array,
        validate:{
            validator:function(params){
                return params.length>0
            },
            message:'You must enter a value'
        }
    },
    job:{
        type:String,
        enum:['developer','programmer']
        
    },
    date: { type: Date, default: Date.now },
    isApproved: Boolean,
    salary:{
        type:Number,
        required:function(){
            return this.isApproved
        }
    }
})

const Employee=mongoose.model('Employee',employeeSchema);

async function createEmployee(){
        const Muhammed=new Employee({
        name:'Maher 1 ',
        age:20,
        department:['next','react'],
        isApproved:true

    })
    const res=await Muhammed.save();
    console.log(res)
}
//createEmployee()
async function getEmployees()
{
    const employees=await Employee.find()
    const employee=await Employee
    //.find({name:'muhammed'}) // where
    .find({age:{$gte:36}})// $gte grater than or equal,$eq equal
    .sort({name:1})  // 1 ASC ,-1 DESC
    .select({name:1,age:1})// columns
    .limit(5)  // number of rows
    console.log(employees)
    console.log('=======================')
    console.log(employee)
}
//Update Employees()
// async function updateEmployee(id)
// {
//     const employee= await Employee.findById(id)
//     if(! employee)
//     {
//         return  console.log('employee not found')
//     }
//     employee.age=50
//     const res=await employee.save()
//     console.log(res +'updated successfully')
// }
// updateEmployee('62de74cef10b6c0c2ed11884')

// async function updateEmployee(id)
// {
//     const employee= await Employee.update({_id:id},{
//         $set:{ age:20}
//     })
//     if(! employee)
//     {
//         return  console.log('employee not found')
//     }
   
//     console.log(employee +'updated successfully')
// }
// updateEmployee('62de74cef10b6c0c2ed11884')
async function update3Employee(id)
{
    const employee= await Employee.findByIdAndUpdate(id,{
        $set:{ age:40}
    },{new:true})
    if(! employee)
    {
        return  console.log('employee not found')
    }
   
    console.log(employee +'updated successfully')
}
//update3Employee('62de74cef10b6c0c2ed11884')
async function deleteEmployee(id)
{
    //const employee= await Employee.deleteOne({_id:id})
    const employee= await Employee.findByIdAndRemove(id)
    if(! employee)
    {
        return  console.log('employee not found')
    }
   
    console.log(employee +'deleted successfully')
}
deleteEmployee('62de74cef10b6c0c2ed11884')
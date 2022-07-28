
const express = require('express');
//use express library
const app = express()
const mongoose = require('mongoose');
const logger = require('./config/logger');
const helmet = require("helmet");
app.use(helmet());

//
if(app.get('env')==='development')
{
    const morgan = require('morgan')
app.use(morgan('tiny'))
// midddle ware
const logging=require('./logger/logging')
app.use(logging)
}
const compression = require('compression')
// database name employees
mongoose.connect('mongodb://localhost/mycompany')
.then(console.log('conected44'))
.catch((e)=>
logger.info('error'+e)
    );


// use json exports
app.use(express.json())
 const employees=require('./routes/employees');
 const users=require('./routes/users');
 const auth=require('./routes/auth');

app.use('/api/employees',employees);
app.use('/api/users',users);
app.use('/api/auth',auth);
// for routes not found
app.all('*',(req,res)=>{
    res.status(404).json({
        status:false,
        message:'wrong route'
    })
})
 const port=process.env.port || 3000;
app.listen(port,()=>{
    //console.log(`working on port ${port}`)
    logger.info(`working on port ${port}`)
})
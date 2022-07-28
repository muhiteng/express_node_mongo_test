const jwt = require('jsonwebtoken');
module.exports=function(req,res,next)
{
    const token =req.header('x-auth-token');
    if(!token)
    {
       return   res.status(401).send('access rejected');
    }
    try{
        const decode=jwt.verify(token,'privatekey');
        req.user=decode;
        next();
    }
    catch(error)
    {
        res.status(400).send('wrong token ..... ');
    }
}
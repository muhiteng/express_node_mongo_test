function log1(req,res,next){
    console.log('middleware1')
    next()
}
function log2(req,res,next){
    console.log('middleware2')
    next()
}

module.exports = log1
module.exports = log2

const testMiddleware=(req,res,next)=>{
    console.log("Middleware called...")
    next()
}
module.exports=testMiddleware
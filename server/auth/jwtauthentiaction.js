const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.json({message: " no token found ",status:false})
    }
    jwt.verify(token,jwt_secret_key,(err,decode)=>{
        if(err){
           return res.json({message:"invalid token",status:false}) 
        }else{
            next()
        }
    })
}
module.exports = {verifyToken}
const User = require('../model/user')

const registerUser=async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const data = await User({
            username,
            email,
            password
        })
        await data.save()
        res.json("data recieved successfully")
    }catch(err){

        console.log(err)
    }
}

const loginUser=async(req,res)=>{
    try{
        const { email,passsword}=req.body
        const loggeduser=await User.findOne({email:email})
        console.log(loggeduser)
        if(loggeduser){
            if(loggeduser.passsword == passsword){
                const token =jwt.sign({id:loggeduser._id},"jwtwebtoken321",{expiresIn:"1hr"})
                res.json({msg:"user logined succesfully",status:200,token});

            }else{
                res.json({msg:"invalid credentials",status:400})
            }
        }else{
            res.json({msg:"user not found",status:400})
        }
    }catch(error){
        console.log(error)
    }
}
module.exports= {registerUser,loginUser}
const User = require('../model/user')
const Product=require('../model/productmodel')
const jwt=require('jsonwebtoken')
const Cart = require('../model/cartmodel')
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
        const { email,password}=req.body
        const loggeduser=await User.findOne({email:email})
        console.log(loggeduser)
        if(loggeduser){
            if(loggeduser.password == password){
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
const ViewProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddCart=async(req,res)=>{
    const userId=req.headers.userId
    const {productId,Quantity}=req.body
    try{
      const cart=await Cart.findOne({userId:userId})
      if(cart){
        const productIndex=cart.product.findIndex(p=>
          p.productId==productId
        )
        if(productIndex > -1){
          cart.product[productIndex].quantity+=Quantity || 1
        }else{
          cart.product.push({productId,quantity:Quantity})
        }
        await cart.save()
      }else{
       const cart=await Cart({
          userId,
          product:[{
             productId,
             quantity:Quantity || 1
          }]
       })
       await cart.save()
      }
      res.json("Product Added to cart successfully")
    }catch(err){
       console.log(err)
    }
}; 

module.exports= {registerUser,loginUser,ViewProduct,AddCart}
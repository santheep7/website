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
                res.json({msg:"user logined succesfully",status:200,token,username:loggeduser.username});

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
    const userId=req.headers.userid
    const {productId,Quantity}=req.body
    console.log(req.headers)
    try{
      const cart=await Cart.findOne({userId:userId,status:"cart"})
      if(cart){
        const productIndex=cart.product.findIndex(p=>
          p.productId==productId
        )
        if(productIndex > -1){
          cart.product[productIndex].quantity += Quantity ? Quantity : 1;

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

const fetchCartById=async(req,res)=>{
  try{
   const userId=req.headers.id;
   const cartItems=await Cart.findOne({userId,status:"cart"}).populate('product.productId')
   console.log(userId)
   console.log(cartItems)
   res.json(cartItems)
  }catch(err){
     console.log(err)
   }
};
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.headers.id;
    const itemId = req.params.itemId; 

    const updatedCart = await Cart.findOneAndUpdate(
      { userId, status: "cart" },
      { $pull: { product: { _id: itemId } } },
      { new: true }
    ).populate('product.productId');

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Item removed from cart", cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete item from cart" });
  }
};




module.exports= {registerUser,loginUser,ViewProduct,AddCart,fetchCartById,deleteCartItem}
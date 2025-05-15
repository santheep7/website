const express = require('express')
const { registerUser, loginUser, AddCart, fetchCartById, deleteCartItem} = require('../controller/usercontrol');
const { ViewProduct } = require('../controller/adminControl');
const userRoute = express.Router()


userRoute.post('/register',registerUser)
userRoute.post('/loginuser', loginUser);
userRoute.get('/viewproduct',ViewProduct);
userRoute.post('/addcart',AddCart);
userRoute.get('/viewcartbyid', fetchCartById);
userRoute.delete('/deletecart/:itemId',deleteCartItem)

module.exports =userRoute;
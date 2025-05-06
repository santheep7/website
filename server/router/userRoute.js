const express = require('express')
const { registerUser, loginUser, AddCart } = require('../controller/usercontrol');
const { ViewProduct } = require('../controller/adminControl');
const userRoute = express.Router()


userRoute.post('/register',registerUser)
userRoute.post('/loginuser', loginUser);
userRoute.get('/viewproduct',ViewProduct);
userRoute.post('/addcart',AddCart);
module.exports =userRoute;
const express = require('express')
const { registerUser, loginUser } = require('../controller/usercontrol')
const userRoute = express.Router()


userRoute.post('/register',registerUser)
userRoute.post('/loginuser', loginUser); // ✅ correct path
module.exports =userRoute;
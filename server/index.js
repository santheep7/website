const express = require('express')
const userRoute = require('./router/userRoute')
const adminRoute = require('./router/adminRouter')
const app = express()
const cors =require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()
app.use('/uploads',express.static('uploads'))
const mongoose =require('mongoose')
const orderRoute = require('./router/orderRouter')
const dbconnect =async()=>{
    try{
        await mongoose.connect(process.env.database_connection)
        console.log("Database connected successfully")
    }
    catch(error){
        console.log("database connection error",error)
    }
}
dbconnect()
app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/order',orderRoute)
// do not give 6000 as PORT it arises issues
app.listen(9000,()=>{
    console.log("Server started successful")
})
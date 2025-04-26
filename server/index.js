const express = require('express')
const userRoute=require('./router/userRoute')
const app = express()
const cors =require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mongoose =require('mongoose')
const dbconnect =async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/testsite")
        console.log("Database connected successfully")
    }
    catch(error){
        console.log("database connection error",error)
    }
}
dbconnect()
app.use('/api/user',userRoute)
// do not give 6000 as PORT it arises issues
app.listen(9000,()=>{
    console.log("Server started successful")
})
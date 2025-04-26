const mongoose =require('mongoose')

const { application } = require('express')
const userSchema = mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String}
},{timestamps:true})



const User = mongoose.model("user_tbl",userSchema)

module.exports = User
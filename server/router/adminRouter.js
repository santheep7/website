const express = require('express')
const { getalluser} = require('../controller/adminControl')
const adminRoute = express.Router()


adminRoute.get('/getuser',getalluser)

module.exports = adminRoute
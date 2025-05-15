const express = require('express')
const { addorder, getOrderStatusById,viewMyOrders, cancelorder } = require('../controller/ordercontrol')

const orderRoute = express.Router()
orderRoute.post("/orderproduct",addorder)
orderRoute.get('/getorderbyid',getOrderStatusById)
orderRoute.get('/vieworder',viewMyOrders)
orderRoute.put('/cancelorder/:orderId',cancelorder)
module.exports=orderRoute;
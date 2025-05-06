const express = require('express');
const multer = require('multer');
const path = require('path');
const { getalluser, delUser, addProduct, ViewProduct, EditProductbyid, UpdateProductbyid, DelProduct } = require('../controller/adminControl');

const adminRoute = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

// Routes
adminRoute.get('/getuser', getalluser);
adminRoute.delete('/deluser', delUser);
adminRoute.post('/addproducts', upload.single('image'), addProduct); // Field name should match React form
adminRoute.get('/viewproducts', ViewProduct);
adminRoute.get('/editproduct/:id',EditProductbyid)
adminRoute.put('/updateproduct/:id',upload.single('image'),UpdateProductbyid)
adminRoute.delete('/deleteproduct/:id',upload.single('image'),DelProduct)
module.exports = adminRoute;

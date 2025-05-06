const User = require('../model/user');
const Product = require('../model/productmodel');

const getalluser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const delUser = async (req, res) => {
  try {
    const id = req.headers.userid;
    await User.findByIdAndDelete(id);
    res.json("User deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productQuantity } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      productName,
      productPrice,
      productDescription,
      productQuantity,
      image
    });

    await newProduct.save();
    res.json({ message: "Product added successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ViewProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const ViewProductbyid = async(req,res)=>{
  try{
    const id= req.headers.id
    const product = await Product.findById({_id:id});
    res.json(product)
  }catch(err){
    console.log(err)
  }
}

module.exports = { getalluser, delUser, addProduct, ViewProduct,ViewProductbyid };

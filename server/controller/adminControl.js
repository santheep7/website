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
const EditProductbyid = async(req,res)=>{
  try{
    const id= req.params.id
    const product = await Product.findById({_id:id});
    res.json(product)
  }catch(err){
    console.log(err)
  }
}
const UpdateProductbyid = async(req,res)=>{
  try{
    const id= req.params.id
    const {productName,productPrice,productDescription,productQuantity}=req.body;
    const image=req.file.filename;
    const product = await Product.findByIdAndUpdate(id,{
      productName,
      productPrice,
      productDescription,
      productQuantity,
      image:image
    });
    await product.save()
    res.json({message:"product updated successfully",status:200})
  }catch(err){
    console.log(err)
  }
}

const DelProduct = async(req,res)=>{
  try{
    const id=req.params.id;
    await Product.findByIdAndDelete(id)
    res.json("Product deleted successfully")
  }catch(error){
    console.log(error)
  }
}

module.exports = { getalluser, delUser, addProduct, ViewProduct,EditProductbyid,UpdateProductbyid,DelProduct };

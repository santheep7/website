const Cart = require('../model/cartmodel'); // ✅ Capitalized model name
// const Product = require('../model/productmodel');
const Order = require('../model/order');

const addorder = async (req, res) => {
  try {
    const { cartId, address, payment, totalAmount } = req.body;
    const userId = req.headers.userid;

    const cartData = await Cart.findById(cartId).populate('product.productId');
    if (!cartData || cartData.product.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    const orderproducts = cartData.product.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    const newOrder = new Order({
      userId,
      products: orderproducts,
      totalAmount,
      address,
      payment
    });

    await newOrder.save();

    cartData.status = "ordered";
    await cartData.save();

    res.status(200).json({ message: "Order placed successfully", orderId: newOrder._id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" }); // ✅ Good to send error response
  }
};

const getOrderStatusById = async (req, res) => {
  try {
    const orderId = req.headers.orderId;

    // Find the order by its ID
    const order = await Order.findById(orderId);

    // If no order found, return 404
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with relevant order status info
    res.status(200).json({
      orderId: order._id,
      status: order.status,
      totalAmount: order.totalAmount,
      products: order.products,
      date: order.createdAt
    });

  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};
const viewMyOrders = async (req, res) => {
  try {
    const userId  = req.headers.userid;


    const orders = await Order.find({ userId })
      .populate('products.productId', 'productName productPrice image') 
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.json(orders);
  } catch (err) {
    console.error("User View Orders Error:", err);
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

const cancelorder = async(req,res)=>{
  try{
    const {orderId} = req.params;
    const order = await Order.findById(orderId);
    if(!order)
      return res.status(404).json({message:"order not found"});
    if(order.status==='Delivered'){
      return res.status(400).json({message:"cannot cancel a delivered order"})
    }
    order.status = 'Cancelled';
    await order.save();
    res.json({message:"Order cancelled succesfully",order});
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Failed to cancle order"});
  }
};




module.exports = { addorder,getOrderStatusById,viewMyOrders,cancelorder };

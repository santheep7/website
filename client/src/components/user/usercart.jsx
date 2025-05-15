import React, { useState, useEffect } from 'react';
import AXIOS from 'axios';
import { jwtDecode } from 'jwt-decode';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UseNavbar from './navbar';
import { Grid } from '@mui/material';
import './usercart.css'; // Make sure this CSS file is present

export default function Cartpage() {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState('');
  const [address, setAddress] = useState('');
  const [cartId, setCartId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = jwtDecode(localStorage.getItem('token'));

  useEffect(() => {
    AXIOS.get("http://localhost:9000/api/user/viewcartbyid", {
      headers: { id: token.id }
    })
      .then((res) => {
        setCart(res.data.product);
        setCartId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch cart.");
      });
  }, []);

  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.quantity * item.productId.productPrice;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !payment) {
      setError("Please fill all fields before submitting.");
      return;
    }
    setLoading(true);

    AXIOS.post("http://localhost:9000/api/order/orderproduct", {
      cartId,
      address,
      payment,
      totalAmount
    }, {
      headers: { userId: token.id }
    })
      .then((res) => {
        alert(res.data.message);
        setCart([]); // Clear the cart after placing the order
        setAddress(''); // Clear the form fields
        setPayment('');
      })
      .catch(() => {
        setError("Failed to place the order.");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (itemId) => {
    AXIOS.delete(`http://localhost:9000/api/user/deletecart/${itemId}`, {
      headers: { id: token.id }
    })
      .then(() => {
        setCart(prev => prev.filter(item => item._id !== itemId));
        alert("Item removed from cart.");
      })
      .catch(() => alert("Failed to remove item."));
  };

  return (
    <>
      <UseNavbar />
      <div className="cart-container">
        <div className="container">
          <h1 className="text-center cart-header">🛒 Your Cart</h1>
          {error && <div className="text-danger mb-3">{error}</div>}

          {cart.length > 0 ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <div className="cart-card">
                  <Table striped bordered hover responsive className="cart-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, idx) => (
                        <tr key={item._id}>
                          <td>{idx + 1}</td>
                          <td>
                            <img
                              src={`http://localhost:9000/uploads/${item.productId.image}`}
                              alt=""
                              style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>{item.productId.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.quantity * item.productId.productPrice}</td>
                          <td>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="cart-card">
                  <h4 className="total-amount">Total: ₹{totalAmount}</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddress" className="mb-3">
                      <Form.Label>Delivery Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        inline
                        label="COD"
                        name="payment"
                        type="radio"
                        value="COD"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <Form.Check
                        inline
                        label="Online Payment"
                        name="payment"
                        type="radio"
                        value="Online Payment"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={loading} className="w-100">
                      {loading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </Form>
                </div>
              </Grid>
            </Grid>
          ) : (
            <h3 className="text-center mt-4">Your cart is empty.</h3>
          )}
        </div>
      </div>
    </>
  );
}

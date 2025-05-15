import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { jwtDecode } from 'jwt-decode';
import UseNavbar from './navbar';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box
} from '@mui/material';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const token = jwtDecode(localStorage.getItem('token'));

  useEffect(() => {
    AXIOS.get("http://localhost:9000/api/order/vieworder", {
      headers: {
        userId: token.id
      }
    }).then(res => {
      setOrders(res.data);
    }).catch(err => {
      console.log(err);
      setError("Failed to fetch orders.");
    });
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
      if (!confirmCancel) return;

      await AXIOS.put(`http://localhost:9000/api/order/cancelorder/${orderId}`);

      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status: 'Cancelled' } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Cancel Order Error:", err);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  return (
    <>
      <UseNavbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>My Orders</Typography>
        {error && <Typography color="error">{error}</Typography>}

        {orders.length > 0 ? (
          <Grid container spacing={3}>
            {orders.map((order) =>
              order.products.map((item, idx) => (
                <Grid item xs={12} md={6} lg={4} key={`${order._id}-${idx}`}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={`http://localhost:9000/uploads/${item.productId.image}`}
                      alt={item.productId.productName}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.productId.productName}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Total: ₹{item.quantity * item.productId.productPrice}</Typography>
                      <Typography>Payment: {order.payment}</Typography>
                      <Typography>Status: {order.status}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ordered At: {new Date(order.createdAt).toLocaleString()}
                      </Typography>

                      {order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelOrder(order._id)}
                          sx={{ mt: 1 }}
                        >
                          Cancel Order
                        </Button>
                      ) : (
                        <Typography sx={{ mt: 1 }} color="text.secondary">
                          Cannot Cancel
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        ) : (
          <Typography variant="h6">No orders yet.</Typography>
        )}
      </Box>
    </>
  );
}

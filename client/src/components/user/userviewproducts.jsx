import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import UserNavbar from './navbar'; // Replace with your user navbar component
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserViewProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AXIOS.get('http://localhost:9000/api/user/viewproduct') // Use the appropriate user-facing endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  const addToCart = (product) => {
    AXIOS.post('http://localhost:9000/api/user/addcart', {
      productId: product._id,
      quantity: 1, // You can adjust quantity logic here
    })
      .then((res) => alert(res.data.message || 'Added to cart'))
      .catch((err) => {
        console.error(err);
        alert('Failed to add to cart');
      });
  };
  return (
    <>
      <UserNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shop Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345 }} style={{ borderRadius: "9px" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:9000/uploads/${item.image}`}
                  alt={item.productName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> ₹{item.productPrice} <br />
                    <strong>Qty:</strong> {item.productQuantity} <br />
                    <strong>Desc:</strong> {item.productDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

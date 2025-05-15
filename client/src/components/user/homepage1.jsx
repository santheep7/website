import React, { useEffect, useState, useRef } from 'react';
import AXIOS from 'axios';
import UserNavbar from './navbar';
import {
  Card, CardContent, CardMedia, Typography,
  Button, Grid, Box, CardActions, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import gsap from 'gsap';

export default function Homepage1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cardsRef = useRef([]);

  useEffect(() => {
   

    

    AXIOS.get('http://localhost:9000/api/user/viewproduct')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching products:', err);
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (products.length > 0) {
      gsap.fromTo(cardsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [products]);

  const addToCart = (product) => {
    alert("Not logined..!")
   navigate("/login")
  };

  if (loading) return <CircularProgress style={{ margin: 100 }} />;

  return (
    <>
      <UserNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shop Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((item, index) => (
            <Grid
              item xs={12} sm={6} md={4}
              key={item._id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:9000/uploads/${item.image}`}
                  alt={item.productName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> ₹{item.productPrice} <br />
                    <strong>Qty in Stock:</strong> {item.productQuantity} <br />
                    <strong>Description:</strong> {item.productDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={item.productQuantity === 0}
                    onClick={() => addToCart(item)}
                  >
                    {item.productQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
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

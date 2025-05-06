import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import AdminBar from './adminnavbar';
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
import './viewprod.css'; // You can still keep this for layout tweaks

export default function AdminViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AXIOS.get('http://localhost:9000/api/admin/viewproducts')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AdminBar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Available Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345 }} style={{borderRadius:"9px"}}>
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
                  <Button size="small" color="error">Delete</Button>
                  <Button size="small" color="warning">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

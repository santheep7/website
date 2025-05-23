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
import { useNavigate } from 'react-router-dom';

export default function AdminViewProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AXIOS.get('http://localhost:9000/api/admin/viewproducts')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
// Inside your component
const deleteProduct = (id) => {
  AXIOS.delete(`http://localhost:9000/api/admin/deleteproduct/${id}`)
    .then((res) => {
      alert(res.data.message || 'Product deleted');
      // Refresh the product list by filtering out the deleted one
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to delete product');
    });
};

  

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
                <Button size="small" color="error" onClick={() => deleteProduct(item._id)}>Delete</Button>
                  <Button size="small" color="warning" onClick={() => navigate(`/admineditproduct/${item._id}`)}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

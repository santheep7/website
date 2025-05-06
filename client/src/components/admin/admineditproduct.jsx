import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import AXIOS from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Admineditproduct() {
  const navigate= useNavigate()
  const params = useParams();
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productQuantity: '',
    image: null
  });

  useEffect(() => {
    AXIOS.get(`http://localhost:9000/api/admin/editproduct/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setProduct({
          ...res.data,
          image: null // Reset image to null to allow new upload
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('productPrice', product.productPrice);
    formData.append('productDescription', product.productDescription);
    formData.append('productQuantity', product.productQuantity);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await AXIOS.put(
        `http://localhost:9000/api/admin/updateproduct/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
      navigate('/adminviewproducts')
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Product</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Price"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <TextField
              fullWidth
              label="Description"
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              fullWidth
              label="Quantity"
              name="productQuantity"
              value={product.productQuantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12}>
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {product.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {product.image.name}
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit Form
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

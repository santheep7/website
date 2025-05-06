import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './addprod.css'
export default function AddProduct() {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('productDescription', product.productDescription);
    formData.append('productPrice', product.productPrice);
    formData.append('productQuantity', product.productQuantity);
    if (image) {
      formData.append('image', image);
    }

    Axios.post('http://localhost:9000/api/admin/addproducts', formData)
      .then((res) => {
        alert('Product added successfully!');
        console.log(res.data);
      })
      .catch((err) => {
        console.error('Error adding product:', err);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add Product</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col >
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control style={{width:"50%", alignItems:"start"}}
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control style={{width:"50%", alignItems:"start"}}
                type="number"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
                required
                placeholder="Enter price"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col >
            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control style={{width:"50%", alignItems:"start"}}
                type="number"
                name="productQuantity"
                value={product.productQuantity}
                onChange={handleChange}
                required
                placeholder="Enter quantity"
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control style={{width:"50%", alignItems:"start"}}
                type="text"
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                required
                placeholder="Enter product description"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col >
            <Form.Group controlId="image">
              <Form.Label>Product Image</Form.Label>
              <Form.Control style={{width:"50%", alignItems:"start"}}
                type="file"
                name="image"
                onChange={handleImage}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button type="submit" variant="primary">
            Submit Product
          </Button>
        </div>
      </Form>
    </Container>
  );
}

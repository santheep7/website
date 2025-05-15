import Axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './addprod.css';
import gsap from 'gsap';

export default function AddProduct() {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '',
  });

  const [image, setImage] = useState(null);

  const bgRef = useRef(null); // Ref for background animation

  useEffect(() => {
    // Animate background gradient movement
    gsap.to(bgRef.current, {
      backgroundPosition: "300% 0%",
      duration: 20,
      repeat: -1,
      ease: "linear"
    });
  }, []);

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
    <div
      ref={bgRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1)',
        backgroundSize: '400% 400%',
        transition: 'background 0.5s ease-in-out',
        paddingTop: '50px',
      }}
    >
      <Container>
        <h2 className="text-center mb-4 text-dark">Add Product</h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
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
            <Col>
              <Form.Group controlId="productQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="productQuantity"
                  value={product.productQuantity}
                  onChange={handleChange}
                  required
                  placeholder="Enter quantity"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
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
            <Col>
              <Form.Group controlId="image">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
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
    </div>
  );
}

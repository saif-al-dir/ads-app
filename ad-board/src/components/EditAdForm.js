// src/components/EditAdForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';

const EditAdForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      const response = await axios.get(`http://localhost:8000/api/ads/${id}`);
      const ad = response.data;
      setTitle(ad.title);
      setContent(ad.content);
      setPrice(ad.price);
      setLocation(ad.location);
      setImage(ad.image);
    };

    fetchAd();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('location', location);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/ads/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Ad updated successfully!');
      setRedirect(true);
    } catch (error) {
      console.error(error);
      alert('Failed to update ad');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group>
      <Button variant="primary" type="submit">Update Ad</Button>
    </Form>
  );
};

export default EditAdForm;

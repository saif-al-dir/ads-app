// src/components/AdList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import the CSS file

const AdList = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get('http://localhost:8000/api/ads');
      setAds(response.data);
    };
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/ads/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAds(ads.filter(ad => ad._id !== id)); // Remove the deleted ad from the state
        alert('Ad deleted successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to delete ad');
      }
    }
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {ads.map(ad => (
        <Col key={ad._id} className="d-flex">
          <Card className="flex-fill">
            {ad.image && (
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${ad.image}`} alt={ad.title} />
            )}
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>
                {ad.content}
              </Card.Text>
              <Card.Text>
                <strong>Price: ${ad.price}</strong>
              </Card.Text>
              <Card.Text>
                <small>Location: {ad.location}</small>
              </Card.Text>
              <Link to={`/edit-ad/${ad._id}`}>
                <Button variant="warning" className="me-2">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(ad._id)}>Delete</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdList;

// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  return (
    <Navbar  bg="light" expand="lg" className="bg-body-tertiary">
      <Navbar.Brand className='' as={Link} to="/">Ad Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {!isLoggedIn && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/create-ad">Create Ad</Nav.Link>}
          {isLoggedIn && (
            <Button variant="outline-danger" onClick={handleLogout}>
              Sign Out
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

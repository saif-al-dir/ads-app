// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container>
        <div className="text-center p-3">
          © {new Date().getFullYear()} Ad Management. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

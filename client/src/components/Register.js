import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('phone', phone);
    if (avatar) formData.append('avatar', avatar);

    try {
      await axios.post('http://localhost:8000/auth/register', formData);
      setRedirect(true);
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
    </Form>
  );
};

export default Register;

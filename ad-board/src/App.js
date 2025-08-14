// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import AdForm from './components/AdForm';
import EditAdForm from './components/EditAdForm';
import Login from './components/Login';
import Register from './components/Register';
import AdList from './components/AdList';
import './styles.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <div className="mt-4 flex-grow-1"> {/* Use flex-grow-1 to allow this section to grow */}
          <h1>Ad Management</h1>
          <Routes>
            <Route path="/" element={<AdList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-ad" element={<AdForm />} />
            <Route path="/edit-ad/:id" element={<EditAdForm />} />
          </Routes>
        </div>
      </div>
        <Footer />
    </Router>
  );
};

export default App;

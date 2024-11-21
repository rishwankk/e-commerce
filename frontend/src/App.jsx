import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart'
import AdminOrders from './components/Admin';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<AdminOrders />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
      }}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
    </motion.nav>
  );
};

export default Navbar;

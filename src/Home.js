// src/Home.js
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
};

const Items = () => (
  <motion.ul
    style={{ listStyleType: 'none', padding: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </motion.ul>
);

export const MyComponent = () => {
  return (
    <motion.nav
      style={{
        backgroundColor: '#007BFF',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        width: '300px',
      }}
      initial="closed"
      animate="open"
      variants={variants}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Items />
    </motion.nav>
  );
};

const Home = () => {
  const username = 'Usuario'; // Simulación de nombre de usuario

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Bienvenido, {username}!</h1>
      <MyComponent />
    </div>
  );
};

export default Home;

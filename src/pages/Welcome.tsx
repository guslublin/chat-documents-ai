// src/pages/Welcome.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const Welcome: React.FC = () => {
  return (
    <div style={styles.container}>
      <motion.div
        className="card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={styles.card as React.CSSProperties}  // Forzamos el tipo correcto aquí
      >
        <h1 style={styles.title}>Chat Documents AI</h1>
        <Link to="/uploadFile" style={styles.link}>Alzar Archivo</Link>
        <Link to="/chatFiles" style={styles.link}>Hablar con los Archivos</Link>
        <Link to="/aboutUs" style={styles.link}>Sobre Nosotros</Link>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa'  // Color verde agua
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#004d40',  // Azul oscuro
    color: '#ffffff',  // Blanco
    textAlign: 'center' as React.CSSProperties['textAlign'],  // Forzamos el tipo de textAlign
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#ffffff'
  },
  link: {
    display: 'block',
    marginBottom: '10px',
    color: '#80deea',  // Verde agua claro
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default Welcome;

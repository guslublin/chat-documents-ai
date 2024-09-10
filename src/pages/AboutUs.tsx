// src/pages/AboutUs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const AboutUs: React.FC = () => {
  return (
    <div style={styles.container}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={{
          ...styles.card,
          // Usar "as" para garantizar que se use un div nativo de HTML
          textAlign: 'center' as React.CSSProperties['textAlign'],
        }}
      >
        <h1 style={styles.title}>Sobre Nosotros</h1>
        <p style={styles.description}>
          Bienvenido a Chat Documents AI, un sistema avanzado para procesar documentos y hablar con los archivos.
          Utilizamos inteligencia artificial para ayudarte a obtener respuestas rápidas y precisas sobre tus documentos.
        </p>
        <Link to="/" style={styles.link}>Volver a Inicio</Link>
        <Link to="/uploadFile" style={styles.link}>Alzar Archivo</Link>
        <Link to="/chatFiles" style={styles.link}>Hablar con los Archivos</Link>
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
    backgroundColor: '#e0f7fa'
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#004d40',
    color: '#ffffff',
    // textAlign lo convertimos en un tipo compatible con framer motion
  } as React.CSSProperties, // Tipo explícito para evitar conflictos de tipado
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#ffffff'
  },
  description: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#ffffff',
  },
  link: {
    display: 'block',
    marginBottom: '10px',
    color: '#80deea',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default AboutUs;

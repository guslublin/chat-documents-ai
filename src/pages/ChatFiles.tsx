// src/pages/ChatFiles.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const ChatFiles: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = async () => {
    try {
      const res = await axios.post('http://localhost:8000/chat/ask/', { question });
      setResponse(res.data.answer);
    } catch (error) {
      alert('Error al procesar la consulta');
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={styles.card as React.CSSProperties}  // Forzamos el tipo correcto
      >
        <h1 style={styles.title}>Hablar con los Archivos</h1>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Haz una pregunta sobre el archivo"
          style={styles.input}
        />
        <button onClick={handleAsk} style={styles.button}>Preguntar</button>
        {response && <p style={styles.response}>Respuesta: {response}</p>}
        <Link to="/" style={styles.link}>Volver a Inicio</Link>
        <Link to="/uploadFile" style={styles.link}>Alzar Archivo</Link>
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
    backgroundColor: '#e0f7fa'
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#004d40',
    color: '#ffffff',
    textAlign: 'center' as React.CSSProperties['textAlign'],  // Forzamos el tipo correcto aquí
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#ffffff'
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #80deea',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#80deea',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#004d40',
    fontSize: '16px',
    marginBottom: '20px',
  },
  response: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#ffffff'
  },
  link: {
    display: 'block',
    marginBottom: '10px',
    color: '#80deea',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default ChatFiles;

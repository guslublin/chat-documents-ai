// src/Login.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password);
    // Lógica de autenticación
  };

  // Función para manejar el botón de registrarse
  const handleRegister = () => {
    // Aquí podrías agregar lógica adicional antes de redirigir si es necesario
    navigate('/home'); // Redirigir a la página Home
  };

  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw', // Asegura que ocupe toda la pantalla
        padding: '20px',
        boxSizing: 'border-box', // Para evitar desplazamientos
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px', // Aumentar padding para mayor espacio
          border: '2px solid #007BFF',
          borderRadius: '15px', // Bordes más redondeados
          backgroundColor: '#f9f9f9',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px', // Ampliar el contenedor
          width: '100%', // Que ocupe todo el espacio posible
          boxSizing: 'border-box',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2>Iniciar Sesión</h2>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <motion.button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '10px',
            width: '100%', // Que el botón ocupe todo el ancho
          }}
          whileHover={{ scale: 1.05 }}
        >
          Iniciar Sesión
        </motion.button>
        <motion.button
          type="button"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '100%', // Que el botón ocupe todo el ancho
          }}
          whileHover={{ scale: 1.05 }}
          onClick={handleRegister} // Llamar a la función de redirección
        >
          Registrarse
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSProperties } from 'react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const ProcessFile: React.FC = () => {
  const [processedFiles, setProcessedFiles] = useState<string[]>([]);  // Archivos procesados
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);
  const [confirmMove, setConfirmMove] = useState<string | null>(null);  // Estado para confirmar movimiento de archivo

  // Función para obtener la lista de archivos procesados
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/chat/files/');
      setProcessedFiles(response.data.processed_files);  // Actualizar los archivos procesados
    } catch (error) {
      console.error('Error al obtener los archivos procesados', error);
    }
  };

  // Cargar la lista de archivos al cargar la página
  useEffect(() => {
    fetchFiles();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setModalText(null);
    fetchFiles();  // Refrescar la lista de archivos después de cerrar el modal
  };

  return (
    <div style={styles.container}>
      <motion.div
        className="card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={styles.card as React.CSSProperties}
      >
        <h1 style={styles.title}>Archivos Procesados</h1>

        {/* Listado de archivos procesados */}
        <h2>Archivos en 'processed_files'</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nombre del Archivo</th>
            </tr>
          </thead>
          <tbody>
            {processedFiles.map((file, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{file}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/" style={styles.link}>Volver a Inicio</Link>
        <Link to="/uploadFile" style={styles.link}>Alzar Archivo</Link>
        <Link to="/aboutUs" style={styles.link}>Sobre Nosotros</Link>
      </motion.div>

      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Resultado del Movimiento</h2>
            <p>{modalText}</p>
            <button onClick={closeModal} style={styles.button}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa',
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#004d40',
    color: '#ffffff',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#ffffff',
  },
  button: {
    margin: '20px 0',
    padding: '10px 20px',
    backgroundColor: '#80deea',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#004d40',
    fontSize: '16px',
  },
  link: {
    display: 'block',
    marginBottom: '10px',
    color: '#80deea',
    textDecoration: 'none',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    borderBottom: '2px solid #ffffff',
    padding: '10px',
    color: '#ffffff',
    textAlign: 'left',
  },
  tableCell: {
    borderBottom: '1px solid #ffffff',
    padding: '10px',
    color: '#ffffff',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
};

export default ProcessFile;

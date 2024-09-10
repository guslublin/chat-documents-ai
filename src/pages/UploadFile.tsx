import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]); // Estado para la lista de archivos
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // Estado para confirmar eliminación
  const [confirmMove, setConfirmMove] = useState<string | null>(null); // Estado para confirmar movimiento
  const [processing, setProcessing] = useState(false); // Estado para gestionar el procesamiento de archivos
  const navigate = useNavigate();

  // Función para obtener la lista de archivos
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/chat/files/');
      setFiles(response.data.uploaded_files); // Actualizar la lista de archivos subidos
    } catch (error) {
      console.error('Error al obtener los archivos', error);
    }
  };

  // Cargar la lista de archivos al cargar la página
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8000/chat/upload/', formData);

        setModalText('Archivo subido correctamente');
        setFiles(response.data.uploaded_files); // Actualizar la lista de archivos
        setModalOpen(true);
      } catch (error) {
        alert('Error al subir el archivo');
      }
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        const formData = new FormData();
        formData.append('file_name', confirmDelete);

        const response = await axios.post('http://localhost:8000/chat/delete/', formData);
        setFiles(response.data.uploaded_files); // Actualizar la lista de archivos
        setConfirmDelete(null); // Limpiar el estado de confirmación
      } catch (error) {
        alert('Error al eliminar el archivo');
      }
    }
  };

  const handleMove = async () => {
    if (confirmMove) {
      try {
        const formData = new FormData();
        formData.append('file_name', confirmMove);

        const response = await axios.post('http://localhost:8000/chat/move/', formData);
        setFiles(response.data.uploaded_files); // Actualizar la lista de archivos
        setConfirmMove(null); // Limpiar el estado de confirmación
        setModalText('Archivo movido correctamente');
        setModalOpen(true);
      } catch (error) {
        alert('Error al mover el archivo');
      }
    }
  };

  // Función para procesar los archivos PDF con IA
  const handleProcessFiles = async () => {
    setProcessing(true);
    try {
      const response = await axios.post('http://localhost:8000/chat/train_ia/');

      setModalText('Archivos procesados y movidos correctamente');
      setModalOpen(true);
      setProcessing(false);
    } catch (error) {
      setModalText('Error al procesar los archivos');
      setModalOpen(true);
      setProcessing(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalText(null);
    fetchFiles(); // Refrescar la lista de archivos después de cerrar el modal
    if (modalText === 'Archivos procesados y movidos correctamente') {
      navigate('/processFile'); // Redirigir si los archivos fueron procesados con éxito
    }
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
        <h1 style={styles.title}>Alzar Archivo</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={styles.button}>
          Subir Archivo
        </button>

        {/* Listado de archivos en tabla */}
        <h2>Archivos Subidos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nombre del Archivo</th>
              <th style={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{file}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => setConfirmDelete(file)}
                  >
                    x
                  </button>
                  <button
                    style={styles.moveButton}
                    onClick={() => setConfirmMove(file)}
                  >
                    Mover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/" style={styles.link}>
          Volver a Inicio
        </Link>
        <Link to="/chatFiles" style={styles.link}>
          Hablar con los Archivos
        </Link>
        <Link to="/aboutUs" style={styles.link}>
          Sobre Nosotros
        </Link>

        {/* Botón para procesar archivos */}
        <button
          onClick={handleProcessFiles}
          style={styles.buttonLink}
          disabled={processing}
        >
          {processing ? 'Procesando...' : 'Procesar Archivos'}
        </button>
      </motion.div>

      {/* Modal de confirmación de eliminación */}
      {confirmDelete && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el archivo "{confirmDelete}"?</p>
            <button onClick={handleDelete} style={styles.button}>
              Confirmar
            </button>
            <button onClick={() => setConfirmDelete(null)} style={styles.button}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de resultado del procesamiento */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Resultado</h2>
            <p>{modalText}</p>
            <button onClick={closeModal} style={styles.button}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
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
    textAlign: 'center' as React.CSSProperties['textAlign'],
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
  buttonLink: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#80deea',
    color: '#004d40',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    borderBottom: '2px solid #ffffff',
    padding: '10px',
    color: '#ffffff',
    textAlign: 'left' as React.CSSProperties['textAlign'],
  },
  tableCell: {
    borderBottom: '1px solid #ffffff', // Aquí está la corrección
    padding: '10px',
    color: '#ffffff',
  },  
  deleteButton: {
    backgroundColor: '#e57373',
    border: 'none',
    color: '#ffffff',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginRight: '10px',
  },
  moveButton: {
    backgroundColor: '#80deea',
    border: 'none',
    color: '#004d40',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  modalOverlay: {
    position: 'fixed' as 'fixed',
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
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
};

export default UploadFile;

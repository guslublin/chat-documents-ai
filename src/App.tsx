// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Welcome from './pages/Welcome';
import UploadFile from './pages/UploadFile';
import ChatFiles from './pages/ChatFiles';
import AboutUs from './pages/AboutUs';
import ProcessFile from './pages/ProcessFile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/uploadFile" element={<UploadFile />} />
        <Route path="/chatFiles" element={<ChatFiles />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/processFile" element={<ProcessFile />} />
      </Routes>
    </Router>
  );
};

export default App;

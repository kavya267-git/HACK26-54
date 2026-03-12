import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import PdfUpload from './pages/PdfUpload';
import Chat from './pages/Chat';
import Eligibility from './pages/Eligibility';
import Schemes from './pages/Schemes';
import Officers from './pages/Officers';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<PdfUpload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/officers" element={<Officers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
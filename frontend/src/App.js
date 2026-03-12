import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import all pages (we'll create these next)
import Home from './pages/Home';
import Officers from './pages/Officers';
import PdfUpload from './pages/PdfUpload';
import Chat from './pages/Chat';
import Eligibility from './pages/Eligibility';
import Schemes from './pages/Schemes';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">🇮🇳 सरकारी सहायक</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/schemes">Schemes</a>
            <a href="/upload">Upload PDF</a>
            <a href="/chat">Voice Chat</a>
            <a href="/eligibility">Check Eligibility</a>
            <a href="/officers">Officers</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/officers/:district" element={<Officers />} />
          <Route path="/upload" element={<PdfUpload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/schemes" element={<Schemes />} />
        </Routes>

        {/* Emergency Banner */}
        <div className="emergency-banner">
          <span>🚓 Police: 100</span>
          <span>🚑 Ambulance: 102</span>
          <span>👩 Women Helpline: 1091</span>
          <span>👶 Child Helpline: 1098</span>
        </div>
      </div>
    </Router>
  );
}

export default App;
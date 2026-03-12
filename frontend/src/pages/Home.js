import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus('✅ Connected'))
      .catch(() => setBackendStatus('❌ Not Connected'));
  }, []);

  const languages = [
    'हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ಕನ್ನಡ', 
    'മലയാളം', 'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'ଓଡ଼ିଆ'
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🇮🇳 सरकारी सहायक</h1>
        <h2>Sarkari Sahayak - Government Schemes Assistant</h2>
        <p className="subtitle">समझें सरकारी योजनाएं अपनी भाषा में</p>
        
        <div className="language-strip">
          {languages.map(lang => (
            <span key={lang} className="language-pill">{lang}</span>
          ))}
        </div>

        <div className="backend-status">
          Backend: {backendStatus}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card" onClick={() => navigate('/schemes')}>
          <div className="feature-icon">📋</div>
          <h3>All Schemes</h3>
          <p>View all government schemes</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/upload')}>
          <div className="feature-icon">📄</div>
          <h3>Upload PDF</h3>
          <p>Upload and parse scheme PDFs</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/chat')}>
          <div className="feature-icon">🎤</div>
          <h3>Voice Assistant</h3>
          <p>Ask in your language</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/eligibility')}>
          <div className="feature-icon">✅</div>
          <h3>Check Eligibility</h3>
          <p>See if you qualify</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/officers')}>
          <div className="feature-icon">👮</div>
          <h3>Find Officers</h3>
          <p>Contact government officials</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📞</div>
          <h3>Emergency</h3>
          <p>Police: 100 | Ambulance: 102</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">300+</div>
          <div>Government Schemes</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">12</div>
          <div>Indian Languages</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div>Voice Support</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
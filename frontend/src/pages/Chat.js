import React from 'react';

function Chat() {
  return (
    <div className="page-container">
      <h1>Voice Assistant</h1>
      <p>Ask questions about government schemes in your language.</p>
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <button className="btn-small">🎤 Start Listening</button>
      </div>
    </div>
  );
}

export default Chat;
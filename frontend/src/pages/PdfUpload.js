import React from 'react';

function PdfUpload() {
  return (
    <div className="page-container">
      <h1>Upload PDF</h1>
      <p>Upload government scheme PDFs to parse and extract information.</p>
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <input type="file" accept=".pdf" />
        <button className="btn-small" style={{ marginLeft: '1rem' }}>Upload</button>
      </div>
    </div>
  );
}

export default PdfUpload;
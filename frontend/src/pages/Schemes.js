import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schemes');
      setSchemes(response.data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Government Schemes</h1>
      {loading ? (
        <p>Loading schemes...</p>
      ) : (
        <div className="schemes-grid">
          {schemes.map(scheme => (
            <div key={scheme.id} className="scheme-card">
              <h3>{scheme.name}</h3>
              <p>{scheme.description}</p>
              <button className="btn-small">Check Eligibility</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Schemes;
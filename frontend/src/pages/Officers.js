import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Officers() {
  const { district } = useParams();
  const [officers, setOfficers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities] = useState(['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Lucknow', 'Jaipur', 'Patna', 'Hyderabad']);

  useEffect(() => {
    fetchOfficers(district || 'Delhi');
  }, [district]);

  const fetchOfficers = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/officers/${city}`);
      setOfficers(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <h1>Government Officers</h1>
      
      <div className="city-selector">
        <h3>Select District:</h3>
        <div className="city-buttons">
          {cities.map(city => (
            <a 
              key={city} 
              href={`/officers/${city}`}
              className="city-btn"
              style={{
                display: 'inline-block',
                margin: '5px',
                padding: '10px 15px',
                background: city === (district || 'Delhi') ? '#FF9933' : '#0B3B5C',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              {city}
            </a>
          ))}
        </div>
      </div>

      {officers && (
        <div className="officers-details" style={{ marginTop: '30px' }}>
          <h2>{district || 'Delhi'} District Officers</h2>
          
          <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#0B3B5C' }}>📋 District Collector / DM</h3>
            <p><strong>Name:</strong> {officers.collector?.name || 'Contact District Office'}</p>
            <p><strong>Phone:</strong> {officers.collector?.phone || '1077'}</p>
            <p><strong>Email:</strong> {officers.collector?.email || 'collector@gov.in'}</p>
          </div>

          <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#0B3B5C' }}>🚔 Police Commissioner / SSP</h3>
            <p><strong>Name:</strong> {officers.police?.name || 'Police Control Room'}</p>
            <p><strong>Emergency:</strong> 100</p>
            <p><strong>Phone:</strong> {officers.police?.phone || '100'}</p>
          </div>

          <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '10px' 
          }}>
            <h3 style={{ color: '#0B3B5C' }}>🏛️ Tehsildar</h3>
            <p><strong>Name:</strong> {officers.tehsildar?.name || 'Tehsil Office'}</p>
            <p><strong>Phone:</strong> {officers.tehsildar?.phone || '1076'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Officers;
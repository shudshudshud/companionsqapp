import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/demo/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reflection }),
      });

      if (!response.ok) {
        throw new Error('Failed to process reflection');
      }

      const data = await response.json();
      navigate('/results', { state: { results: data } });
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Try CompanionSquared</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reflection">Share your reflection:</label>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows="6"
            required
            placeholder="Write about your day, thoughts, or feelings..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Analyze Reflection'}
        </button>
      </form>
    </div>
  );
};

export default Demo; 
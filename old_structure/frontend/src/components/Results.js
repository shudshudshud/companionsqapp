import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  if (!results) {
    return (
      <div className="container">
        <h1>No Results Found</h1>
        <p>Please try the demo again.</p>
        <button onClick={() => navigate('/demo')}>Back to Demo</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Reflection Analysis</h1>
      
      <div className="results-section">
        <h2>Key Insights</h2>
        <ul>
          {results.insights?.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="results-section">
        <h2>Emotional Analysis</h2>
        <div className="emotion-chart">
          {results.emotions?.map((emotion, index) => (
            <div key={index} className="emotion-bar">
              <span className="emotion-label">{emotion.name}</span>
              <div 
                className="emotion-value" 
                style={{ width: `${emotion.value * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="results-section">
        <h2>Recommendations</h2>
        <ul>
          {results.recommendations?.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/demo')}>Try Another Reflection</button>
        <button onClick={() => navigate('/subscribe')}>Subscribe for More</button>
      </div>
    </div>
  );
};

export default Results; 
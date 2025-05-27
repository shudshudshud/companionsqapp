import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container">
      <h1>Welcome to CompanionSquared</h1>
      <p>Your AI-powered companion for personal growth and reflection.</p>
      <div className="mt-4">
        <Link to="/demo" className="btn btn-primary">Try Demo</Link>
        <Link to="/subscribe" className="btn btn-secondary ml-3">Subscribe</Link>
      </div>
    </div>
  );
};

export default Landing; 
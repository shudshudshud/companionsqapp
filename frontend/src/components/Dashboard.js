import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
  const { userId } = useAuth();
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reflections', {
          headers: {
            'Authorization': `Bearer ${await getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reflections');
        }

        const data = await response.json();
        setReflections(data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchReflections();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Your Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Reflections</h3>
          <p>{reflections.length}</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p>
            {reflections.filter(r => {
              const date = new Date(r.createdAt);
              const now = new Date();
              return date.getMonth() === now.getMonth() &&
                     date.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      <div className="recent-reflections">
        <h2>Recent Reflections</h2>
        {reflections.slice(0, 5).map((reflection) => (
          <div key={reflection.id} className="reflection-card">
            <h3>{new Date(reflection.createdAt).toLocaleDateString()}</h3>
            <p>{reflection.content.substring(0, 150)}...</p>
            <div className="reflection-meta">
              <span>Mood: {reflection.mood}</span>
              <span>Insights: {reflection.insights.length}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-actions">
        <button onClick={() => window.location.href = '/demo'}>
          New Reflection
        </button>
        <button onClick={() => window.location.href = '/profile'}>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 
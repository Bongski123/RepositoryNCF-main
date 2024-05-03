import React, { useState, useEffect } from 'react';

function TotalPending() {
  const [TotalPendingResearches, setTotalPendingResearches] = useState(null);

  useEffect(() => {
    fetchTotalPendingResearches();
  }, []);

  const fetchTotalPendingResearches = async () => {
    try {
      const response = await fetch('http://localhost:9001/total_researches');
      const data = await response.json();
      setTotalPendingResearches(data.total_pending);
    } catch (error) {
      console.error('Error fetching total researches:', error);
    }
  };

  return (
    <div>
      <h1>Total Researches</h1>
      {TotalPendingResearches === null ? (
        <p>Loading...</p>
      ) : (
        <p>Total researches: {TotalPendingResearches}</p>
      )}
    </div>
  );
}

export default TotalPending;
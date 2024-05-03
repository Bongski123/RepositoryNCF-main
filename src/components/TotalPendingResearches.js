import React, { useState, useEffect } from 'react';

function TotalResearch() {
  const [totalPendingResearches, setTotalResearches] = useState(null);

  useEffect(() => {
    fetchTotalResearches();
  }, []);

  const fetchTotalResearches = async () => {
    try {
      const response = await fetch('http://localhost:9001/api/total_pending_researches');
      const data = await response.json();
      setTotalResearches(data.total_pending_researches);
    } catch (error) {
      console.error('Error fetching total researches:', error);
    }
  };

  return (
    <div>
      <h1>Total Researches</h1>
      {totalPendingResearches === null ? (
        <p>Loading...</p>
      ) : (
        <p>Total researches: {totalPendingResearches}</p>
      )}
    </div>
  );
}

export default TotalResearch;
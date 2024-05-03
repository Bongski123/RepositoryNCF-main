import React, { useState, useEffect } from 'react';

function TotalAuthors() {
  const [totalAuthors, setTotalAuthors] = useState(null);

  useEffect(() => {
    fetchTotalAuthors();
  }, []);

  const fetchTotalAuthors = async () => {
    try {
      const response = await fetch('http://localhost:9001/total_authors');
      const data = await response.json();
      setTotalAuthors(data.total_authors);
    } catch (error) {
      console.error('Error fetching total researches:', error);
    }
  };

  return (
    <div>
      <h1>Total Authors</h1>
      {totalAuthors === null ? (
        <p>Loading...</p>
      ) : (
        <p>Total Authors: {totalAuthors}</p>
      )}
    </div>
  );
}

export default TotalAuthors;
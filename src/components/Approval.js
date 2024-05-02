import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminApproval = () => {
  const [pendingResearches, setPendingResearches] = useState([]);

  useEffect(() => {
    const fetchPendingResearches = async () => {
      try {
        const response = await axios.get('http://localhost:9000/pending-researches');
        setPendingResearches(response.data);
      } catch (error) {
        console.error('Error fetching pending researches:', error);
      }
    };

    fetchPendingResearches();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:9000/approve/${id}`);
      // After approval, update the state by removing the approved research
      setPendingResearches(pendingResearches.filter(research => research.id !== id));
    } catch (error) {
      console.error('Error approving research:', error);
      alert('Error approving research');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Pending Researches</h2>
        <ul>
          {pendingResearches.map(research => (
            <li key={research.id}>
              <div>
                <strong>Title:</strong> {research.title}
              </div>
              <div>
                <strong>Author:</strong> {research.author}
              </div>
              <div>
                <strong>Abstract:</strong> {research.abstract}
              </div>
              {/* When approving, call handleApprove with research id */}
              <button onClick={() => handleApprove(research.id)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminApproval;

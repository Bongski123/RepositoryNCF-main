import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/researches.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const ResearchesTable = () => {
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get('http://localhost:9001/researches');
        setResearches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching researches:', error);
        setError('Error fetching researches. Please try again later.');
        setLoading(false);
      }
    };

    fetchResearches();
  }, []);

  const handleDeleteResearch = async (researchId) => {
    try {
      await axios.delete(`http://localhost:9001/researches/${researchId}`);
      // After deletion, fetch the updated list of researches
      const response = await axios.get('http://localhost:9001/api/researches');
      setResearches(response.data);
    } catch (error) {
      console.error('Error deleting research:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResearches = researches.filter((research) =>
    research.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>All Researches</h2>
      {/* Search bar */}
      <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
      <table className="researches-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Publish Date</th>
            <th>Department</th>
            <th>Category</th>
            <th>Author Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResearches.map((research) => (
            <tr key={research.researches_id}>
              <td>{research.title}</td>
              <td>{research.publish_date}</td>
              <td>{research.department_name}</td>
              <td>{research.category_name}</td>
              <td>{research.author_name}</td>
              <td>
                {/* Add button for deleting the research */}
                <button onClick={() => handleDeleteResearch(research.researches_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearchesTable;

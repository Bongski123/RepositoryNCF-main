import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './CSS/ResearchDetailPage.css';

function ResearchDetailPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [clickedResearch, setClickedResearch] = useState(null);

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:9001/researches`);
        setResearches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching researches:", error);
        setError("Error fetching researches. Please try again later.");
        setLoading(false);
      }
    };

    fetchResearches();
  }, []);

  const filteredResearches = researches.filter((research) =>
    research.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom sorting function based on relevance to search term
  const sortByRelevance = (a, b) => {
    const relevanceA = a.title.toLowerCase().indexOf(searchTerm.toLowerCase());
    const relevanceB = b.title.toLowerCase().indexOf(searchTerm.toLowerCase());
    return relevanceA - relevanceB;
  };

  const sortedResearches = [...filteredResearches].sort(sortByRelevance);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResearches = sortedResearches.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    // Additional search logic can be added here if needed
  };

  const handleClickResearch = (research) => {
    setClickedResearch(research);
  };

  return (
    <div className="container">
      {clickedResearch && (
        <div className="clicked-research">
          <h2>{clickedResearch.title}</h2>
          <p>{clickedResearch.description}</p>
          {/* Add more details or components to display more information */}
        </div>
      )}

      <ul>
        {currentResearches.map((research) => (
          <li key={research.researches_id}>
            <Link to={`/researches/${research.researches_id}`} onClick={() => handleClickResearch(research)}>
              <h3>{research.title}</h3>
              <p>{research.description}</p>
              {/* Add more details or components to display more information */}
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(sortedResearches.length / itemsPerPage)}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= sortedResearches.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ResearchDetailPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

function SearchResult({ result }) {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to the detailed page
  const handleNavigateToDetailPage = () => {
    // Pass the result object as state to the detailed page
    navigate(`/researches`, { state: { result } });
  };

  return (
    <div className="search-result" onClick={handleNavigateToDetailPage}>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{result.title}</p>
      <p>Author: {result.author_name}</p>
    </div>
  );
}

export default SearchResult;

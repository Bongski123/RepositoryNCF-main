import React, { useState } from "react";
import { SearchBar } from "./SearchBar"; // Assuming you have already created a SearchBar component
import SearchResult from "./SearchResult"; // Import the SearchResult component
import Fuse from "fuse.js"; // Import the Fuse.js library

function SearchContainer({ documents }) {
  const [input, setInput] = useState(""); // State to store user input
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Define Fuse.js options for fuzzy search
  const fuseOptions = {
    keys: ["title", "authors"], // Properties to search within
    threshold: 0.3, // Set the threshold for fuzzy search
  };

  // Initialize Fuse.js with documents and options
  const fuse = new Fuse(documents, fuseOptions);

  // Function to update search results based on user input
  const updateSearchResults = (value) => {
    setInput(value); // Update input state
    if (value.trim() !== "") {
      // Perform search only if input is not empty
      const results = fuse.search(value).map((result) => result.item); // Perform fuzzy search
      setSearchResults(results); // Update search results state
    } else {
      setSearchResults([]); // Clear search results if input is empty
    }
  };

  return (
    <div>
      <SearchBar setResults={updateSearchResults} /> {/* Render the search bar component */}
      <div className="search-results">
        {/* Render search results */}
        {searchResults.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
}

export default SearchContainer;

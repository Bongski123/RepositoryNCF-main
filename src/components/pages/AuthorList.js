import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Button } from 'react-bootstrap';
import './CSS/AuthoList.css'; // Import custom CSS for styling

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortedAsc, setSortedAsc] = useState(true); // State to track sorting order
  const [filteredAuthors, setFilteredAuthors] = useState([]); // State to store filtered authors

  useEffect(() => {
    // Fetch authors when component mounts
    axios.get(`http://localhost:9001/authors?page=${currentPage}&perPage=${perPage}`)
      .then(response => {
        const sortedAuthors = response.data.sort((a, b) => {
          // Sort alphabetically based on first name
          return sortedAsc ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName);
        });
        setAuthors(sortedAuthors);
        setFilteredAuthors(removeDuplicateAuthors(sortedAuthors)); // Initialize filteredAuthors with sortedAuthors without duplicates
        // Assuming the API provides the total number of pages
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching authors');
        setLoading(false);
      });
  }, [currentPage, perPage, sortedAsc]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const removeDuplicateAuthors = (authors) => {
    const uniqueAuthors = authors.filter((author, index) => {
      const firstIndexOfAuthor = authors.findIndex(a => a.firstName === author.firstName && a.lastName === author.lastName);
      return firstIndexOfAuthor === index;
    });
    return uniqueAuthors;
  };

  const filterAuthorsByLetter = (letter) => {
    // Filter authors whose first name starts with the selected letter from the original list of authors
    const filtered = authors.filter(author => author.firstName.charAt(0).toLowerCase() === letter.toLowerCase());
    setFilteredAuthors(removeDuplicateAuthors(filtered));
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="author-list-container">
      <h1>Author List</h1>
      {/* Button to toggle sorting order */}
   
      {/* Buttons to filter authors by first letter */}
      <div>
        {alphabet.map(letter => (
          <Button key={letter} onClick={() => filterAuthorsByLetter(letter)}>
            {letter.toUpperCase()}
          </Button>
        ))}
      </div>
      <ul>
        {filteredAuthors.map((author, index) => ( 
          <li key={author.id}>
            {/* Numbering each author */}
            <span>{index + 1}. </span>
            <Link to={`/author/${author.user_id}`}>{author.firstName} {author.lastName}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Pagination className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default AuthorList;

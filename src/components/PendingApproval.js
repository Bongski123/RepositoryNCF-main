import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css'; // Assuming User.css contains your custom styles for the table
import { Table } from 'react-bootstrap';

const PendingResearches = () => {
  const [pendingResearches, setPendingResearches] = useState([]);

  // Function to fetch pending researches from the server
  const fetchPendingResearches = async () => {
    try {
      const response = await axios.get('http://localhost:9001/pending-researches');
      setPendingResearches(response.data);
    } catch (error) {
      console.error('Error fetching pending researches:', error);
    }
  };

  // Function to fetch author data for a given research
  const fetchAuthors = async (researchId) => {
    try {
      const response = await axios.get(`http://localhost:9001/authors/${researchId}`);
      return response.data.map(author => author.name).join(', '); // Assuming author name is stored in a property called "name"
    } catch (error) {
      console.error('Error fetching authors:', error);
      return 'N/A'; // Return "N/A" if there's an error fetching authors
    }
  };

  // Function to approve a pending research
  const approveResearch = async (id) => {
    try {
      await axios.put(`http://localhost:9001/approve/${id}`);
      // After approval, fetch updated pending researches
      fetchPendingResearches();
    } catch (error) {
      console.error('Error approving research:', error);
    }
  };

  // Fetch pending researches when the component mounts
  useEffect(() => {
    fetchPendingResearches();
  }, []);

  return (
    <div className="container">
      <h2>Pending Researches</h2>
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Date</th>
         
            <th>Department ID</th>
            <th>Category ID</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingResearches.map(research => (
            <tr key={research.id}>
              <td>{research.title}</td>
              <td>{research.user_id}</td> {/* This is where the error occurs */}
              <td>{research.publish_date}</td>
      
              <td>{research.department_id}</td>
              <td>{research.category_id}</td>
              <td>{research.file_name}</td>
              <td><button className="btn btn-primary" onClick={() => approveResearch(research.id)}>Approve</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendingResearches;

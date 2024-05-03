import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../auth/AuthWrapper";
import '../pages/CSS/Account.css';

export const Account = () => {
  const { user } = useAuth();
  const [userResearches, setUserResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserResearches = async () => {
      try {
        // Retrieve email from user data
        const userEmail = user.name;

        // Fetch user-specific uploaded researches
        const uploadedResponse = await axios.get(`http://127.0.0.1:9001/author/${userEmail}`);
        // Fetch user-specific pending researches
        const pendingResponse = await axios.get(`http://127.0.0.1:9001/author/${userEmail}/pending`);

        // Combine uploaded and pending researches into a single array
        const combinedResearches = [...uploadedResponse.data, ...pendingResponse.data];
        setUserResearches(combinedResearches);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's researches:", error);
        setError("Error fetching user's researches. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserResearches();
  }, [user.name]);

  return (
    <div className="page">
      <h2>Your Account</h2>
      <p>Username: {user.name}</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <h3>Your Researches</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
                <th>Category</th>
                <th>Department</th>
                <th>Status</th>
                <th>Cite</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {userResearches.map((research) => (
                <tr key={research.id}>
                  <td>{research.research_title}</td>
                  <td>{research.publish_date}</td>
                  <td>{research.category_name}</td>
                  <td>{research.department_name}</td>
                  <td>{research.status}</td>
                  {/* Add appropriate action buttons */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

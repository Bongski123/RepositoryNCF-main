import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PDFViewer from "./PDFViewer"; // Import PDFViewer component

function RenderValue(value) {
  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <div>
        {Object.entries(value).map(([key, val]) => (
          <div key={key}>
            <strong>{key}: </strong> {RenderValue(val)}
          </div>
        ))}
      </div>
    );
  }
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <div key={index}>{RenderValue(item)}</div>
    ));
  }
  return <p>{value}</p>;
}

function ResearchDetail() {
  const { researches_id } = useParams(); // Retrieve the researches_id parameter
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:9001/researches/${researches_id}`);
        console.log("API Response:", response.data);
        
        // Remove the undesired item
        const filteredResearch = { ...response.data };
        delete filteredResearch['0:']; // Remove the undesired item, replace '0:' with the actual key
        delete filteredResearch['user_id:'];
        
        if (filteredResearch) {
          setResearch(filteredResearch);
          setLoading(false);
        } else {
          setError("No research found for the provided ID.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching research:", error);
        setError("Error fetching research. Please try again later.");
        setLoading(false);
      }
    };

    fetchResearch();
  }, [researches_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!research) return <div>No research found for ID: {researches_id}</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h2>{research.title}</h2>
        {Object.entries(research).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "20px" }}>
            <strong>{key}: </strong> {RenderValue(value)}
          </div>
        ))}
        <div>
          <PDFViewer researchId={researches_id} /> {/* Pass researches_id as a prop */}
        </div>
      </div>
    </div>
  );
}

export default ResearchDetail;

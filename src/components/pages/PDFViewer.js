import React, { useState, useEffect } from "react";
import axios from "axios";

function PDFViewer({ researchId }) {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      if (!researchId) {
        setError("Research ID is missing");
        setLoading(false);
        return;
      }

      try {
        // Make a request to the backend endpoint to retrieve the PDF file based on research ID
        const response = await axios.get(`http://127.0.0.1:9001/pdf/${researchId}`, {
          responseType: "blob",
        });
        const pdfBlob = response.data;
        const url = URL.createObjectURL(pdfBlob);
        setFileData(url);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("PDF not found");
        } else {
          setError("Error fetching PDF");
        }
        setLoading(false);
      }
    };

    fetchPDF();
  }, [researchId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {fileData && (
        <embed src={fileData} type="application/pdf" width="100%" height="600px" />
      )}
    </div>
  );
}

export default PDFViewer;

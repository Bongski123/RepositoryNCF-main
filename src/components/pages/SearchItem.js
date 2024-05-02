// ResearchItem.js

import React from "react";
import { Link } from "react-router-dom";

function ResearchItem({ research }) {
  return (
    <div className="research-item">
      <Link to={`/researches/${research.research_id}`}>
        <h3>{research.title}</h3>
      </Link>
      {/* You can add more details here if needed */}
    </div>
  );
}

export default ResearchItem;

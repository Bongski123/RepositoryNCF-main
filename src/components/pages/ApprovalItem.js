import React from 'react';

const ApprovalItem = ({ research, onApprove }) => {
  const { id, title, author, abstract } = research;

  return (
    <li>
      <div>
        <strong>Title:</strong> {title}
      </div>
      <div>
        <strong>Author:</strong> {author}
      </div>
      <div>
        <strong>Abstract:</strong> {abstract}
      </div>
      <button onClick={() => onApprove(id)}>Approve</button>
    </li>
  );
};

export default ApprovalItem;

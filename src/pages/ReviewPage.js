import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../css/ReviewPage.css';

const ReviewPage = () => {
  const { extractedText } = useAuth();

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Review Extracted Text</h2>
      {extractedText ? (
        <>
          <button onClick={handleDownload} style={{ marginBottom: '20px' }}>
            Download Text
          </button>
          <pre className="text-output">{extractedText}</pre>
        </>
      ) : (
        <p>No text has been extracted yet. Please upload a PDF in the "Upload PDF" tab.</p>
      )}
    </div>
  );
};

export default ReviewPage;
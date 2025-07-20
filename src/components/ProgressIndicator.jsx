// src/components/ProgressIndicator.jsx
import React from 'react';
import PropTypes from 'prop-types';

function ProgressIndicator({ loading, currentPageProgress, overallDocumentProgress, currentPage, totalPages, fileType }) {
  if (!loading) return null;

  return (
    <div className="section-container" style={{ textAlign: 'center' }}>
      <h2>Processing Document...</h2>
      {fileType === 'application/pdf' ? (
        <>
          <p>
            Overall Document Progress: {overallDocumentProgress}%
            {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
          <progress value={overallDocumentProgress} max="100"></progress>
          {currentPage > 0 && currentPageProgress > 0 && ( // Only show current page progress if it's relevant
             <>
               <p>Current Page OCR Progress: {currentPageProgress}%</p>
               <progress value={currentPageProgress} max="100"></progress>
             </>
          )}
        </>
      ) : (
        <>
          <p>OCR Progress: {currentPageProgress}%</p>
          <progress value={currentPageProgress} max="100"></progress>
        </>
      )}
      <p>Please wait, this might take a moment...</p>
    </div>
  );
}

ProgressIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPageProgress: PropTypes.number.isRequired, // Renamed
  overallDocumentProgress: PropTypes.number.isRequired, // Renamed
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  fileType: PropTypes.string,
};

export default ProgressIndicator;
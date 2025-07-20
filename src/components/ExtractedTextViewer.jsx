// src/components/ExtractedTextViewer.jsx
import React from 'react';
import PropTypes from 'prop-types';

function ExtractedTextViewer({ text }) {
  if (!text) return null;

  return (
    <div className="section-container">
      <h2>Extracted Text</h2>
      <textarea
        value={text}
        readOnly
        rows="15"
        cols="80"
      ></textarea>
      <button
        onClick={() => navigator.clipboard.writeText(text)}
        style={{ marginTop: '15px' }}
      >
        Copy Text
      </button>
    </div>
  );
}

ExtractedTextViewer.propTypes = {
  text: PropTypes.string,
};

export default ExtractedTextViewer;
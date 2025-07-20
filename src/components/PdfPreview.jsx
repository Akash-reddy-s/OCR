// src/components/PdfPreview.jsx
import React from 'react';
import PropTypes from 'prop-types';

function PdfPreview({ canvasRef }) {
  return (
    <div className="section-container">
      <h2>PDF Page Rendering for OCR</h2>
      <p>The PDF pages are converted to images here for text extraction.</p>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          maxWidth: '100%',
          maxHeight: '400px',
          display: 'block',
          margin: '0 auto',
          borderRadius: '5px'
        }}
      ></canvas>
    </div>
  );
}

PdfPreview.propTypes = {
  canvasRef: PropTypes.object.isRequired, // Expecting a ref object
};

export default PdfPreview;
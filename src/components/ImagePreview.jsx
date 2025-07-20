// src/components/ImagePreview.jsx
import React from 'react';
import PropTypes from 'prop-types';

function ImagePreview({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <div className="section-container">
      <h2>Original Image Preview</h2>
      <img
        src={imageUrl}
        alt="Document Preview"
        style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ddd', borderRadius: '5px' }}
      />
    </div>
  );
}

ImagePreview.propTypes = {
  imageUrl: PropTypes.string,
};

export default ImagePreview;
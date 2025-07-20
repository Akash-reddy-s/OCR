// src/components/FileUploader.jsx
import React from 'react';
import PropTypes from 'prop-types';

function FileUploader({ onFileChange, disabled }) {
  return (
    <div className="section-container" style={{ textAlign: 'center' }}>
      <h2>Upload Document</h2>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={onFileChange}
        disabled={disabled}
        style={{ marginBottom: '15px' }}
      />
      {/* You could add a button here to trigger OCR after file selection,
          but for simplicity, we'll keep the trigger button in App.jsx for now */}
    </div>
  );
}

FileUploader.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default FileUploader;
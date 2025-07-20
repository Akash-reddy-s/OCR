import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Import the new, refactored service functions
import { getPdfDocument, renderPage } from '../services/pdfService';
import Tesseract from 'tesseract.js';
import '../css/UploadPage.css';

const UploadPage = () => {
  const { setExtractedText } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [fileName, setFileName] = useState('');

  const processPdf = useCallback(async (file) => {
    if (!file || !canvasRef.current) return;
    
    setIsLoading(true);
    setFileName(file.name);
    setStatus('Initializing...');

    try {
      const pdfArrayBuffer = await file.arrayBuffer();

      const pdfDocument = await getPdfDocument(pdfArrayBuffer);
      const pageCount = pdfDocument.numPages;
      setStatus(`Found ${pageCount} pages. Starting OCR...`);

      let fullText = '';
      for (let i = 1; i <= pageCount; i++) {
        setStatus(`Processing page ${i} of ${pageCount}...`);

        const page = await pdfDocument.getPage(i);
        const pageImageUrl = await renderPage(page, canvasRef.current);
        const { data } = await Tesseract.recognize(pageImageUrl, 'eng');
        fullText += data.text + '\n\n---\n\n';
      }

      setExtractedText(fullText);
      setStatus('Processing Complete! Redirecting...');
      navigate('/review');

    } catch (error)      {
      console.error("Error during PDF processing:", error);
      setStatus(`An error occurred while processing ${fileName}.`);
      // Reset after error so user can try again
      setTimeout(() => {
        setIsLoading(false);
        setFileName('');
      }, 3000);
    }
    // Note: We don't set isLoading to false in the `finally` block on success
    // because we navigate away. It's handled in the error case.
  }, [setExtractedText, navigate, fileName]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processPdf(file);
    }
  };

  return (
    <div className="upload-page-container">
      <h2>Document Processor</h2>
      <div className="upload-card">
        <div className="upload-icon">
          {/* A simple SVG icon for uploading */}
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.99 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
          </svg>
        </div>
        
        {!isLoading ? (
          <>
            <p className="upload-main-text">Drag & Drop PDF Here</p>
            <p className="upload-sub-text">or</p>
            <label className="upload-button">
              Browse Files
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                disabled={isLoading} 
              />
            </label>
          </>
        ) : (
          <div className="processing-status">
            <p className="upload-main-text">Processing: {fileName}</p>
            <p className="upload-sub-text">{status}</p>
            <div className="progress-bar">
              <div className="progress-bar-inner"></div>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default UploadPage;

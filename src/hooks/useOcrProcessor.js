// src/hooks/useOcrProcessor.js
import { useState, useCallback } from 'react';
import { renderPdfPageToImage } from '../services/pdfService';
import Tesseract from 'tesseract.js';

export const useOcrProcessor = () => {
  const [ocrResult, setOcrResult] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const processPdf = useCallback(async (file, canvas) => {
    if (!file) return;

    setIsLoading(true);
    setOcrResult('');
    setPreviewImage('');
    setProgress(0);

    try {
      // 1. Read the file into an ArrayBuffer.
      const pdfArrayBuffer = await file.arrayBuffer();

      // 2. Render the first page to get an image URL for both the preview and OCR.
      const imageUrl = await renderPdfPageToImage(pdfArrayBuffer, 1, canvas);
      setPreviewImage(imageUrl); // Set the preview image for the UI.

      // 3. Pass the resulting IMAGE URL to Tesseract.
      const { data } = await Tesseract.recognize(imageUrl, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });
      setOcrResult(data.text);

    } catch (error) {
      console.error('Processing error:', error);
      setOcrResult('An error occurred during processing.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ocrResult, previewImage, progress, isLoading, processPdf };
};
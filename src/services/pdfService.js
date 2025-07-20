import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source only once when the module is loaded.
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

/**
 * Loads a PDF from an ArrayBuffer and returns the document object.
 * This is the only function that should handle the raw buffer.
 * @param {ArrayBuffer} pdfArrayBuffer - The ArrayBuffer of the PDF file.
 * @returns {Promise<pdfjsLib.PDFDocumentProxy>} A Promise that resolves with the PDF document object.
 */
export const getPdfDocument = async (pdfArrayBuffer) => {
  // Use .slice(0) to clone the buffer. This is a crucial safety step
  // to prevent the original buffer from being detached by the worker.
  const bufferClone = pdfArrayBuffer.slice(0);
  return pdfjsLib.getDocument(bufferClone).promise;
};

/**
 * Renders a single page from an already loaded PDF document object.
 * @param {pdfjsLib.PDFPageProxy} page - The page object from `pdfDocument.getPage()`.
 * @param {HTMLCanvasElement} canvas - The canvas element to render on.
 * @param {number} [scale=2] - The scale factor for rendering. Higher is better quality.
 * @returns {Promise<string>} A Promise that resolves with the data URL of the rendered image.
 */
export const renderPage = async (page, canvas, scale = 2) => {
  const viewport = page.getViewport({ scale });
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const context = canvas.getContext('2d');
  await page.render({ canvasContext: context, viewport }).promise;

  return canvas.toDataURL('image/png');
};

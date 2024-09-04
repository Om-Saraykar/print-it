import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentIcon } from '@heroicons/react/24/outline'; // Ensure you have this import or use an alternative PDF icon

const DropZone = ({ onFilesAccepted }) => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [printMode, setPrintMode] = useState('color'); // Default print mode
  const [pageRange, setPageRange] = useState('all'); // Default to printing all pages
  const [fromPage, setFromPage] = useState(''); // State for custom range 'from' page
  const [toPage, setToPage] = useState(''); // State for custom range 'to' page

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': []
    },
    onDrop: acceptedFiles => {
      const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length > 0) {
        setFiles(pdfFiles);
        onFilesAccepted(pdfFiles);
      } else {
        alert('Only PDF files are allowed');
      }
    },
    onDropRejected: rejectedFiles => {
      rejectedFiles.forEach(file => {
        console.warn(`File rejected: ${file.file.name}. Reason: ${file.errors.map(e => e.message).join(', ')}`);
      });
    },
  });

  useEffect(() => {
    const previews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);

    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  return (
    <div className="container mx-auto p-6">
      <div
        {...getRootProps()}
        className="h-[30vh] border-2 border-gray-300 p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer mb-6 flex flex-col items-center justify-center"
      >
        <input {...getInputProps()} />
        <DocumentIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-center text-gray-700 text-lg font-medium">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      {files.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            Uploaded Files:
          </h3>
          <ul className="list-disc pl-6 mb-6 space-y-4">
            {files.map((file, index) => (
              <li key={index} className="flex items-center text-gray-600 mb-2">
                <DocumentIcon className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium">{file.name}</span> - {Math.round(file.size / 1024)} KB
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <label htmlFor="printMode" className="text-lg font-medium text-gray-700 mr-4">
              Print Mode:
            </label>
            <select
              id="printMode"
              value={printMode}
              onChange={(e) => setPrintMode(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="color">Color</option>
              <option value="blackAndWhite">Black & White</option>
            </select>
            
            <label htmlFor="pageRange" className="text-lg font-medium text-gray-700 ml-6 mr-4">
              Page Range:
            </label>
            <select
              id="pageRange"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All</option>
              <option value="custom">Custom</option>
            </select>
            
            {pageRange === 'custom' && (
              <div className="mt-4 flex items-center justify-center gap-7">
                <div className="flex items-center mb-2">
                  <label htmlFor="fromPage" className="text-lg font-medium text-gray-800 mr-4">
                    From:
                  </label>
                  <input
                    type="number"
                    id="fromPage"
                    value={fromPage}
                    onChange={(e) => setFromPage(e.target.value)}
                    placeholder="e.g., 1"
                    className="p-2 border border-gray-300 rounded-lg w-24"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label htmlFor="toPage" className="text-lg font-medium text-gray-800 mr-4">
                    To:
                  </label>
                  <input
                    type="number"
                    id="toPage"
                    value={toPage}
                    onChange={(e) => setToPage(e.target.value)}
                    placeholder="e.g., 5"
                    className="p-2 border border-gray-300 rounded-lg w-24"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">PDF Preview:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {filePreviews.map((preview, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2 flex justify-center">
                  <iframe
                    src={preview}
                    title={`PDF Preview ${index + 1}`}
                    width="100%"
                    height="400px"
                    className="h-[70vh] border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;

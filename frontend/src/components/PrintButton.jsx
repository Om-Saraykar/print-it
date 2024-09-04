import React from 'react';
import printJS from 'print-js';
import axios from 'axios';

const PrintButton = ({ files, numPages = 1, printerName = 'Default Printer' }) => {
  const handlePrint = async () => {
    // Create a FormData object to send files and other parameters
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });
    formData.append('numPages', numPages);
    formData.append('printerName', printerName);

    console.log(numPages, printerName)
    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:8000/api/v1/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Handle the response from the server

      // Show success message
      alert('File successfully uploaded!');

    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
    }
  };

  return (
    <div className="flex justify-center mt-4 pb-10">
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Print
      </button>
    </div>
  );
};

export default PrintButton;

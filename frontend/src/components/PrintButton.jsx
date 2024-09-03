import React from 'react';
import printJS from 'print-js'; // Importing the default export

const PrintButton = ({ files }) => {
  const handlePrint = () => {
    files.forEach(file => {
      printJS({
        url: URL.createObjectURL(file),
        type: 'pdf',
      });
    });
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

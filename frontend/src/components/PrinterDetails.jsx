import React, { useState, useEffect } from 'react';

const PrinterDetails = () => {
  const [printerDetails, setPrinterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrinterDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/getPrinterDetails');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrinterDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrinterDetails();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center">
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <div className="text-gray-600 text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Printer Details</h1>
          <div className="bg-red-100 p-4 rounded-lg border border-red-300">
            Error: Failed to get Printer Details
          </div>
        </div>
      </div>
    );
  }

  if (!printerDetails) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <div className="text-gray-600 text-lg font-medium">No printer details found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Printer Details</h1>
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-lg text-gray-700 mb-2"><strong>Device Name:</strong> {printerDetails.deviceName}</p>
          <p className="text-lg text-gray-700"><strong>Page Count:</strong> {printerDetails.pageCount}</p>
        </div>
      </div>
    </div>
  );
}

export default PrinterDetails;

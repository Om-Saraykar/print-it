import React, { useState } from 'react';
import Navbar from './Navbar';
import DropZone from './DropZone';
import PrintButton from './PrintButton';
import PrinterDetails from './PrinterDetails';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />   
      <DropZone onFilesAccepted={setFiles} />
      <PrinterDetails />
      <PrintButton files={files} />
    </div>

  )
}

export default Dashboard

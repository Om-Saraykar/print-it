import React, { useState } from 'react';
import Navbar from './Navbar';
import DropZone from './DropZone';
import PrintButton from './PrintButton';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <Navbar />
      <DropZone onFilesAccepted={setFiles} />
      <PrintButton files={files} />
    </div>
  )
}

export default Dashboard

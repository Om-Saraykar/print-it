import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentIcon } from '@heroicons/react/24/outline'; // Importing the DocumentIcon

const DropZone = ({ onFilesAccepted }) => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
      onFilesAccepted(acceptedFiles);
    },
  });

  useEffect(() => {
    // Generate URLs for file previews
    const previews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);

    // Clean up the URLs when component unmounts or files change
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Files:</h3>
          <ul className="list-disc pl-6 mb-6">
            {files.map((file, index) => (
              <li key={index} className="text-gray-600 mb-2">
                <span className="font-medium">{file.name}</span> - {Math.round(file.size / 1024)} KB
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">PDF Preview:</h3>
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

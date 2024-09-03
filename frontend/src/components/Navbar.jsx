import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          PDF Dashboard
        </div>
        <div className="space-x-4">
          <a href="#" className="text-white hover:text-gray-300 transition duration-150">Home</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-150">About</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-150">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

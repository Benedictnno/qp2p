import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CryptoBrains</h1>
        <ul className="flex space-x-8 text-gray-600">
          <li className="hover:text-blue-600 cursor-pointer">Market</li>
          <li className="hover:text-blue-600 cursor-pointer">Trade</li>
          <li className="hover:text-blue-600 cursor-pointer">Earn</li>
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Career</li>
        </ul>
        <div className="space-x-4">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md">Login</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

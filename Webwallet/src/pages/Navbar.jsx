import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#9a1c74] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="hover:text-pink-500 transition-all">
            <span className="text-pink-500">Wallet</span>App
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center space-x-6">
          <Link
            to="/dashboard"
            className="hover:text-pink-500 transition-all font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="hover:text-pink-500 transition-all font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Transactions
          </Link>
          <Link
            to="/budget"
            className="hover:text-pink-500 transition-all font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Budget
          </Link>
          <Link
            to="/reports"
            className="hover:text-pink-500 transition-all font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Reports
          </Link>
        </div>

        {/* Profile and Login buttons on the right */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="hover:text-pink-500 transition-all font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Login
          </Link>
          <Link
            to="/profile"
            className="hover:text-pink-500 transition-all  font-bold text-xl py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#9a1c74] text-white space-y-4 py-4 px-6">
          <Link
            to="/dashboard"
            className="block hover:text-pink-500 transition-all py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="block hover:text-pink-500 transition-all py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Transactions
          </Link>
          <Link
            to="/budget"
            className="block hover:text-pink-500 transition-all py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Budget
          </Link>
          <Link
            to="/reports"
            className="block hover:text-pink-500 transition-all py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Reports
          </Link>
          <Link
            to="/profile"
            className="block hover:text-pink-500 transition-all py-2 px-4 rounded-md hover:bg-[#5f1843]"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

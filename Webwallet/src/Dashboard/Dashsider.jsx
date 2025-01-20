import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBarChart2, FiDollarSign, FiTag, FiSettings, FiLogOut } from "react-icons/fi";

function Dashsider() {
  return (
    <div className="bg-[#FADADD]  h-screen w-64 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center p-10 h-20 border-b border-white/20">
        <Link to="/" className="text-2xl  text-pink-500">
          Wallet<span className="text-black">App </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center px-6 py-3 text-sm font-medium hover:bg-[#f5b8bf] transition"
            >
              <FiHome className="mr-3 text-lg" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/transactionss"
              className="flex items-center px-6 py-3 text-sm font-medium  hover:bg-[#f5b8bf] transition"
            >
              <FiDollarSign className="mr-3 text-lg" />
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="flex items-center px-6 py-3 text-sm font-medium  hover:bg-[#f5b8bf] transition"
            >
              <FiBarChart2 className="mr-3 text-lg" />
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="flex items-center px-6 py-3 text-sm font-medium  hover:bg-[#f5b8bf] transition"
            >
              <FiTag className="mr-3 text-lg" />
              Categories
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto">
        <button className="flex items-center w-full px-6 py-3 text-sm font-bold hover:bg-[#f5b8bf] transition">
          <FiLogOut className="mr-3 text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashsider;

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#681351] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-pink-500">Wallet</h2>
          <p className="text-sm leading-6">
            WalletApp helps you manage your finances effortlessly. Track
            transactions across different accounts like:
            <br />
            - Bank Accounts
            <br />
            - Mobile Money Accounts
            <br />
            - Cash Transactions
            <br />
            Stay on top of your budget and generate insightful reports with
            ease.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <a
              href="#"
              className="bg-pink-950 hover:bg-pink-500 hover:text-white rounded-full p-2 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-pink-950 hover:bg-pink-500 hover:text-white rounded-full p-2 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-pink-950 hover:bg-pink-500 hover:text-white rounded-full p-2 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-pink-950 hover:bg-pink-500 hover:text-white rounded-full p-2 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-pink-950 hover:bg-pink-500 hover:text-white rounded-full p-2 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-pink-500">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Help (FAQ)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-pink-500">
            Resources
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Partner Directory
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Affiliate Program
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-pink-500 transition"
              >
                Free Invoice Generator
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-pink-500">
            Contact Us
          </h2>
          <p className="text-sm leading-6">
            <FaPhoneAlt className="inline mr-2" /> +250793949032
            <br />
            <FaEnvelope className="inline mr-2" /> eric@gmail.com
            <br />
            <FaMapMarkerAlt className="inline mr-2" /> KG 15 Av, Kigali, Rwanda
            <br />
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-gray-300">
        Copyright 2025 <span className="text-pink-500">Eric's Wallet</span>.
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

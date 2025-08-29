import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedin, FaBehance } from "react-icons/fa";
import logo from '../../images/footerlogo.png'
import { FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-6">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Copyright & Address */}
        <p className="text-sm text-white">
          © 2025 JWELLERY GEMSTONES & ANTIQUES. All Rights Reserved.
        </p>
        <p className="text-sm text-white mt-1">
          123 Baker Street, Lahore Main Buleward, Pakistan
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Social Icons */}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center max-w-3xl mx-auto">
      <a
        href="https://facebook.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
      >
        <span className="text-sm">Facebook</span> <FaFacebookF />
      </a>

      <a
        href="https://instagram.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        <span className="text-sm">Instagram</span> <FaInstagram />
      </a>

      <a
        href="https://youtube.com/@yourchannel"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-red-500 transition"
      >
        <span className="text-sm">YouTube</span> <FaYoutube />
      </a>

      <a
        href="https://tiktok.com/@yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        <span className="text-sm">TikTok</span> <FaTiktok />
      </a>

      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
      >
        <span className="text-sm">LinkedIn</span> <FaLinkedin />
      </a>

      <a
        href="https://behance.net/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-gray-600 px-4 py-2 rounded-md hover:bg-blue-800 transition"
      >
        <span className="text-sm">Behance</span> <FaBehance />
      </a>
    </div>
      </div>

      {/* Floating WhatsApp Button */}
       <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <FaWhatsapp className="w-7 h-7 text-white" />
    </a>
    </footer>
  );
}

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';

const NavBar = () => {
  return (
    <header
      className="flex items-center justify-between px-6 py-4"
      style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 1000
      }}
    >
      {/* LOGO (image) */}
      <div className="flex items-center">
        <img src={logo} alt="BARNACLEAN" className="h-12" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/statistics" className="text-gray-700 hover:text-blue-600">Statistics</Link>
        <Link to="/model" className="text-gray-700 hover:text-blue-600">Biofouling Predictor</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      </nav>

      {/* Login Button */}
      <Link to="/login">
        <button className="bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90">
          Login
        </button>
      </Link>
    </header>
  )
}

export default NavBar
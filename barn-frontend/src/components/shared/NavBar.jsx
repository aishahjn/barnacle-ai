import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-between px-8 py-4 rounded-4xl my-6"
      style={{
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        zIndex: 1000,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* LOGO (image) */}
      <div className="flex items-center">
        <img src={logo} alt="BARNACLEAN" className="h-12" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-10">
        <a onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</a>
        <a onClick={() => navigate('/statistics')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Statistics</a>
        <a onClick={() => navigate('/model')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Biofouling Predictor</a>
        <a onClick={() => navigate('/about')} className="text-gray-700 hover:text-blue-600 cursor-pointer">About</a>
      </nav>

      {/* Login Button */}
      <button
        onClick={() => navigate('/login')}
        className="bg-gradient-to-b from-sky-400 to-blue-600 text-white font-semibold px-5 py-3 rounded-full shadow-md hover:opacity-95"
      >
        Login
      </button>
    </header>
  )
}

export default NavBar
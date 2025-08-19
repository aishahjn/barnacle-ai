import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="shadow-xl flex items-center justify-between md:px-6 py-4 rounded-3xl my-6 mt-10"
      style={{
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        zIndex: 1000,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* LOGO (flex-1) */}
      <div className="flex flex-2 items-center">
        <img 
          src={logo} 
          alt="BARNACLEAN" 
          className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* NAV LINKS + BUTTON (flex-5) */}
      <div className="hidden md:flex flex-3 items-center justify-end space-x-10 text-lg tracking-wide font-semibold">
        <a onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</a>
        <a onClick={() => navigate('/statistics')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Statistics</a>
        <a onClick={() => navigate('/model')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Model</a>
        <a onClick={() => navigate('/about')} className="text-gray-700 hover:text-blue-600 cursor-pointer">About</a>
        
        <button
          onClick={() => navigate('/login')}
          className="tracking-wide bg-gradient-to-b from-sky-400 to-blue-600 text-white font-semibold px-8 py-2 rounded-full shadow-md hover:opacity-95 text-lg"
        >
          Login
        </button>
      </div>
    </header>
  )
}

export default NavBar

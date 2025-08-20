import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { NAVIGATION_LINKS, LOGIN_BUTTON, USER_PROFILE } from '../../constants/navigationConstants';

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
      <div className="flex flex-4 items-center">
        <img
          src={logo}
          alt={USER_PROFILE.logoAlt}
          className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* NAV LINKS + BUTTON (flex-5) */}
      <div className="hidden md:flex flex-5 items-center justify-around space-x-6 text-lg tracking-wide font-semibold">
        {NAVIGATION_LINKS.map((link) => (
          <a
            key={link.id}
            onClick={() => navigate(link.path)}
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            {link.label}
          </a>
        ))}

        {/* Profile Section */}
        <div className="flex items-center space-x-2 ml-4">
          
          <CgProfile
            className="text-2xl text-gray-700 hover:text-blue-600 cursor-pointer"
            style={{ fontSize: '24px' }}
            size={40}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">{USER_PROFILE.name}</span>
            <span className="text-xs text-gray-500">{USER_PROFILE.role}</span>
          </div>
          <FaSignOutAlt
            className="ml-6 text-2xl text-gray-700 hover:text-blue-600 cursor-pointer"
            style={{ fontSize: '24px' }}
            size={40}
          />
        </div>
      </div>
    </header>
  )
}

export default NavBar

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CgProfile } from 'react-icons/cg';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { NAVIGATION_LINKS, LOGIN_BUTTON } from '../../constants/navigationConstants';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import OptimizedImage from './OptimizedImage';
import { 
  logoutUser, 
  selectIsAuthenticated, 
  selectUser, 
  selectUserName, 
  selectUserInitials, 
  selectUserRole,
  selectIsLoading 
} from '../../redux/Slices/userSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  
  // Redux selectors for authentication state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userName = useSelector(selectUserName);
  const userInitials = useSelector(selectUserInitials);
  const userRole = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoading);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate away on logout failure for UX
      navigate('/');
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Filter navigation links based on authentication status
  const getVisibleLinks = () => {
    // Statistics page requires authentication
    return NAVIGATION_LINKS.filter(link => {
      if (link.path === '/statistics') {
        return isAuthenticated;
      }
      return true;
    });
  };

  // Navigation bar with fixed positioning to prevent content overlap
  // Implements Nielsen's Heuristic 1: Visibility of System Status with active indicators

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-white shadow-xl rounded-3xl px-8 py-4 flex items-center justify-between">
      {/* LOGO (flexible) */}
      <div className="flex items-center flex-shrink-0">
        <OptimizedImage
          src={logo}
          alt="BARNACLEAN"
          className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => handleNavigation('/')}
          loading="eager"
        />
      </div>

      {/* NAV LINKS + BUTTON (more space) */}
      <div className="hidden md:flex items-center justify-end space-x-4 lg:space-x-6 text-base font-medium flex-1 ml-8">
        {getVisibleLinks().map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavigation(link.path)}
            aria-label={`Navigate to ${link.label} page`}
            aria-current={isActivePath(link.path) ? 'page' : undefined}
            className={`relative px-4 py-2 rounded-lg ${DESIGN_TOKENS.animations.transition.fast} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
              isActivePath(link.path)
                ? 'text-blue-600 bg-blue-50 font-semibold shadow-sm'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium'
            }`}
          >
            {link.label}
          </button>
        ))}

        {/* Authentication Section */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-2 ml-6">
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="User profile menu"
                aria-expanded={isProfileMenuOpen}
                className={`flex items-center space-x-3 p-2 rounded-lg ${DESIGN_TOKENS.animations.transition.fast} focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50`}
              >
                {/* User Avatar */}
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                  {userInitials || <FaUser className="text-sm" />}
                </div>
                
                {/* User Info */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-700 leading-tight">
                    {userName || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 leading-tight font-medium">
                    {userRole || 'Member'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      handleNavigation('/profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <CgProfile className="text-gray-500" />
                    <span>View Profile</span>
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 ml-6">
            <button
              onClick={() => handleNavigation(LOGIN_BUTTON.path)}
              className="px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-lg whitespace-nowrap"
            >
              {LOGIN_BUTTON.label}
            </button>
            <button
              onClick={() => handleNavigation('/signup')}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 whitespace-nowrap"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      </div>
    </header>
  )
}

export default NavBar

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, userRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Our Team', path: '/team' },
    { name: '5S Tracker', path: '/tracker' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="bg-brand-navy text-white fixed w-full z-50 top-0 h-16 shadow-md border-b border-brand-mid/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/home')}>
            <ShieldCheck className="h-8 w-8 text-brand-gold mr-2" />
            <span className="font-bold text-xl tracking-tight text-white">
              Ramco<span className="text-brand-gold">Shine</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8 space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-brand-gold' : 'text-gray-300 hover:text-white hover:bg-brand-mid/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transform origin-left transition-transform duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User & Logout (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{user?.displayName || user?.email?.split('@')[0]}</span>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 font-bold ${
                userRole === 'admin' ? 'bg-brand-gold text-brand-navy' : 'bg-brand-mid text-gray-300'
              }`}>
                {userRole || 'viewer'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-300 hover:text-danger-red hover:bg-danger-red/10 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-mid focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-brand-navy shadow-xl border-b border-brand-mid transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-md text-base font-medium ${
                  isActive ? 'bg-brand-mid text-brand-gold border-l-4 border-brand-gold' : 'text-gray-300 hover:bg-brand-mid/50 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        
        {/* Mobile User Info */}
        <div className="pt-4 pb-4 border-t border-brand-mid">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-brand-mid flex items-center justify-center text-brand-gold">
                <User className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {user?.displayName || user?.email?.split('@')[0]}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400 mt-1">
                {user?.email}
              </div>
            </div>
            <div className="ml-auto">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                userRole === 'admin' ? 'bg-brand-gold text-brand-navy' : 'bg-brand-mid text-gray-300'
              }`}>
                {userRole || 'viewer'}
              </span>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-danger-red hover:bg-danger-red/10 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

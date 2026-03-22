import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Settings } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname === '/admin';

  const scrollToSection = (sectionId) => {
    if (isAdminPage) {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo && !isAdminPage) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, isAdminPage, navigate]);

  useEffect(() => {
    if (isAdminPage) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminPage]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-gray-900/95 to-gray-800/95 dark:from-gray-950/95 dark:to-gray-900/95 backdrop-blur-md border-b border-white/10 py-4">
      <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
          onClick={() => !isAdminPage && scrollToSection('home')}
        >
          Portfolio.
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex list-none gap-8 m-0 p-0">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <li key={section} className="relative">
              <button
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-all duration-300 py-2 block capitalize ${
                  !isAdminPage && activeSection === section
                    ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text'
                    : 'text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text'
                }`}
              >
                {section}
              </button>
              {!isAdminPage && activeSection === section && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            className="group relative w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-full h-full rounded-full border border-white/20 bg-gray-800 flex items-center justify-center">
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </div>
          </button>

          {/* Admin Link */}
          <Link
            to="/admin"
            className="group relative w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Admin Dashboard"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-full h-full rounded-full border border-white/20 bg-gray-800 flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
            </div>
          </Link>

          {/* Hire Me Button */}
          <button
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('contact')}
          >
            <div className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm transition-all duration-300">
              Hire Me
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
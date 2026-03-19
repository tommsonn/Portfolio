import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminClick = () => {
    window.location.pathname = '/admin';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#242424]/95 dark:bg-[#242424]/95 backdrop-blur-md border-b border-white/10 py-6">
      <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Portfolio.</div>

        <ul className="hidden md:flex list-none gap-10 m-0 p-0">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <li key={section} className="relative">
              <a
                onClick={() => scrollToSection(section)}
                className={`text-white/80 hover:text-[#ff8c42] no-underline cursor-pointer font-medium transition-colors duration-300 py-2 block capitalize ${
                  activeSection === section ? 'text-[#ff8c42]' : ''
                }`}
              >
                {section}
              </a>
              {activeSection === section && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#ff8c42]" />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            className="bg-transparent border-2 border-white/20 hover:border-[#ff8c42] rounded-full w-[45px] h-[45px] flex items-center justify-center cursor-pointer text-xl transition-all duration-300 hover:rotate-[20deg]"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            className="bg-transparent border-2 border-white/20 hover:border-[#ff8c42] rounded-full w-[45px] h-[45px] flex items-center justify-center cursor-pointer text-xl transition-all duration-300 hover:rotate-[20deg]"
            onClick={handleAdminClick}
            aria-label="Admin"
            title="Admin Dashboard"
          >
            ⚙️
          </button>
          <button
            className="bg-[#ff8c42] hover:bg-[#ff7a28] text-white border-none py-3 px-8 rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-base hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(255,140,66,0.4)]"
            onClick={() => scrollToSection('contact')}
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

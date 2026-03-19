import { useState } from 'react';

function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('http://localhost:5000/api/cv/download');

      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center py-24 pt-24 pb-16 relative overflow-hidden bg-white dark:bg-[#1a1a1a]" id="home">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <div className="relative">
          <div className="flex gap-6 mb-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,140,66,0.3)] bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,140,66,0.3)] bg-black text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,140,66,0.3)] bg-[#333] text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,140,66,0.3)] bg-[#ff0000] text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
            Hi, I'm <span className="text-[#ff8c42]">Thomas Tesema</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70 mb-10 max-w-[500px]">
            I'm a passionate Full-Stack Developer who loves building clean, scalable,
            and user-friendly web applications. I turn ideas into real-world digital
            solutions using modern technologies.
          </p>

          <div className="flex gap-6 flex-wrap">
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="px-8 py-4 rounded-[30px] font-semibold text-base cursor-pointer transition-all duration-300 flex items-center gap-2 border-2 bg-[#ff8c42] text-white border-[#ff8c42] hover:bg-[#ff7a28] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,140,66,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {isDownloading ? 'Downloading...' : 'Download CV'}
            </button>
            <button className="px-8 py-4 rounded-[30px] font-semibold text-base cursor-pointer transition-all duration-300 flex items-center gap-2 border-2 bg-transparent text-[#ff8c42] border-[#ff8c42] hover:bg-[#ff8c42]/10 hover:-translate-y-0.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Me
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute top-[10%] right-[20%] bg-gradient-to-br from-[#a855f7] to-[#ec4899] px-6 py-4 rounded-2xl flex items-center justify-center font-bold text-4xl text-[#ffd700] animate-[float_3s_ease-in-out_infinite]">
            Hi
            <span className="absolute -bottom-2.5 -right-2.5 text-2xl">👋</span>
          </div>
          <img
            src="/tom2.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

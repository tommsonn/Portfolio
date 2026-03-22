import { useState } from 'react';
import { 
  Github, 
  Instagram, 
  Twitter, 
  Youtube, 
  Download, 
  Mail,
  Linkedin,
  Send,
  Briefcase
} from 'lucide-react';

function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

  const API_URL = 'https://portfolio-bkvz.onrender.com/api'; 
  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      console.log('Downloading from:', `${API_URL}/cv/download`);
      
      const response = await fetch(`${API_URL}/cv/download`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download CV');
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
      alert(error.message || 'Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { 
      Icon: Github, 
      href: 'https://github.com/tommsonn', 
      label: 'GitHub',
      gradient: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800'
    },
    { 
      Icon: Instagram, 
      href: 'https://instagram.com/tommsonn', 
      label: 'Instagram',
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      hoverColor: 'hover:from-pink-400 hover:via-red-400 hover:to-yellow-400'
    },
    { 
      Icon: Youtube, 
      href: 'https://www.youtube.com/channel/UCL-xQWVI8-yi4oz7iREI3zA',
      label: 'YouTube',
      gradient: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-500 hover:to-red-600'
    },
    { 
      Icon: Send, 
      href: 'https://t.me/tomm_son',
      label: 'Telegram',
      gradient: 'from-cyan-500 to-blue-500',
      hoverColor: 'hover:from-cyan-400 hover:to-blue-400'
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-24 pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="home">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full relative z-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ Icon, href, label, gradient, hoverColor }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={label}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className={`relative w-[50px] h-[50px] bg-gradient-to-r ${gradient} ${hoverColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-gray-900 dark:text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thomas Tesema
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-[500px]">
            I'm a passionate Full-Stack Developer who loves building clean, scalable,
            and user-friendly web applications. I turn ideas into real-world digital
            solutions using modern technologies.
          </p>

          {/* Stats Section */}
          <div className="flex gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                8+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Clients</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 flex-wrap">
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] transition-all duration-300 hover:scale-105"
            >
              <div className="relative flex items-center gap-2 rounded-[30px] bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300">
                <Download className={`w-5 h-5 ${isDownloading ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                <span>{isDownloading ? 'Downloading...' : 'Download CV'}</span>
              </div>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="group flex items-center gap-2 px-8 py-4 rounded-[30px] font-semibold text-base transition-all duration-300 hover:-translate-y-1 bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900"
            >
              <Mail className="w-5 h-5 group-hover:animate-shake" />
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Column - Profile Image */}
        <div className="relative flex justify-center items-center">
          {/* Experience Badge */}
          <div className="absolute bottom-[20%] left-[5%] z-10 animate-float-delayed">
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">3+ Years</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Container with Glow Effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/tom2.jpg"
                alt="Thomas Tesema"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Decorative Dots */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-blue-500/20 rounded-full"></div>
          <div className="absolute -top-10 -right-10 w-20 h-20 border-2 border-purple-500/20 rounded-full"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

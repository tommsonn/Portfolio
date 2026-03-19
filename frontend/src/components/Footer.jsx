function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 dark:bg-black/30 border-t border-white/10 pt-12 pb-6 mt-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-8">
          <div>
            <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">Portfolio.</h3>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed">Creating amazing digital experiences one project at a time.</p>
          </div>

          <div>
            <h4 className="text-xl mb-4 text-[#ff8c42]">Quick Links</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2"><a href="#home" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">About</a></li>
              <li className="mb-2"><a href="#skills" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Skills</a></li>
              <li className="mb-2"><a href="#projects" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Projects</a></li>
              <li className="mb-2"><a href="#contact" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-4 text-[#ff8c42]">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Instagram</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-white/60 no-underline transition-colors duration-300 hover:text-[#ff8c42]">Twitter</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 dark:text-white/50 m-0 text-sm">&copy; {currentYear} QualiCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

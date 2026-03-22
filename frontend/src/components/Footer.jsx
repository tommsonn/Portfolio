function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-950 dark:to-black border-t border-white/10 pt-12 pb-6 mt-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio.
            </h3>
            <p className="text-gray-400 dark:text-gray-400 leading-relaxed max-w-[250px]">
              Creating amazing digital experiences one project at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Instagram', href: 'https://instagram.com' },
                { name: 'GitHub', href: 'https://github.com' },
                { name: 'LinkedIn', href: 'https://linkedin.com' },
                { name: 'Twitter', href: 'https://twitter.com' },
                { name: 'Telegram', href: 'https://t.me/tomm_son' }

              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {currentYear} QualiCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
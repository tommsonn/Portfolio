function Projects() {
  const projects = [
    {
      title: 'TomShop - E-Commerce Platform',
      description: 'Full-featured e-commerce platform with product management, user authentication, multiple payment methods (Telebirr, Chapa, Bank Transfer), admin dashboard, and real-time notifications.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'TypeScript', 'Telebirr API'],
      link: 'https://e-commerce-frontend-4yol.onrender.com',
      github: 'https://github.com/tommsonn/E-commerce',
      featured: true
    },
    {
      title: 'Social Media App',
      description: 'Real-time social networking platform with messaging, posts, and user profiles.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Firebase', 'CSS'],
      link: '#',
      github: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Minimalist portfolio template for creatives and developers to showcase their work.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Vite', 'Tailwind'],
      link: '#',
      github: '#'
    },
    {
      title: 'Task Management',
      description: 'Collaborative task manager with drag-and-drop, team collaboration, and time tracking.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'TypeScript', 'API'],
      link: '#',
      github: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with forecasts, maps, and location-based alerts.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'API', 'Charts'],
      link: '#',
      github: '#'
    },
    {
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support, comments, and user authentication.',
      image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Next.js', 'CMS'],
      link: '#',
      github: '#'
    }
  ];

  // Sort to show featured project first
  const sortedProjects = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section className="py-24 bg-gray-50 dark:bg-white/[0.02]" id="projects">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          My Projects
          <span className="block w-[100px] h-1 bg-[#ff8c42] mt-4 mx-auto rounded-sm"></span>
        </h2>
        
        {/* Featured Badge */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#ff8c42] text-white px-4 py-2 rounded-full text-sm font-semibold">
            ⭐ Featured: TomShop - Live E-Commerce Platform
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProjects.map((project, index) => (
            <div 
              key={index} 
              className={`bg-gray-100 dark:bg-white/[0.05] rounded-[20px] overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgba(255,140,66,0.2)] ${
                project.featured 
                  ? 'border-[#ff8c42] shadow-[0_10px_30px_rgba(255,140,66,0.3)] relative' 
                  : 'border-gray-200 dark:border-white/10 hover:border-[#ff8c42]'
              }`}
            >
              {project.featured && (
                <div className="absolute top-4 left-4 z-10 bg-[#ff8c42] text-white px-3 py-1 rounded-full text-xs font-bold">
                  Live Demo
                </div>
              )}
              <div className="relative h-[250px] overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#ff8c42]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    {project.link !== '#' && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white text-[#ff8c42] py-3 px-6 rounded-[25px] no-underline font-bold transition-all duration-300 hover:bg-[#242424] hover:text-white hover:scale-105"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#242424] text-white py-3 px-6 rounded-[25px] no-underline font-bold transition-all duration-300 hover:bg-white hover:text-[#ff8c42] hover:scale-105 border border-white/20"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <span className="text-xs bg-[#ff8c42] text-white px-2 py-1 rounded-full">Live</span>
                  )}
                </h3>
                <p className="text-base leading-relaxed text-gray-600 dark:text-white/70 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`py-2 px-4 rounded-[20px] text-sm font-semibold border ${
                        project.featured && tag.includes('Telebirr') 
                          ? 'bg-[#ff8c42]/30 text-[#ff8c42] border-[#ff8c42]/50' 
                          : 'bg-[#ff8c42]/20 text-[#ff8c42] border-[#ff8c42]/30'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
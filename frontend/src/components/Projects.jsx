import { ExternalLink, Github } from 'lucide-react';

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

  const sortedProjects = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" id="projects">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          My Projects
          <span className="block w-[100px] h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 mx-auto rounded-full"></span>
        </h2>
        
        {/* Featured Badge */}
        <div className="text-center mb-8">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            ⭐ Featured: TomShop - Live E-Commerce Platform
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProjects.map((project, index) => (
            <div 
              key={index} 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <div className="flex gap-3">
                    {project.link !== '#' && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Live Demo
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                      +{project.tags.length - 4}
                    </span>
                  )}
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
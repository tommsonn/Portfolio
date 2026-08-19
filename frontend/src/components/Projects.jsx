import { ExternalLink, Github } from 'lucide-react';

function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio website built with React, Vite, and Tailwind CSS. Features dark mode, admin dashboard for CV and message management, contact form, and responsive design.',
      image: '/portfolio-image.png',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Render'],
      link: 'https://portfolio-frontend-n8ib.onrender.com',
      github: 'https://github.com/tommsonn/portfolio',
      featured: true,
      liveDemo: true
    },
    {
      title: 'TomShop - E-Commerce Platform',
      description: 'Full-featured e-commerce platform with product management, user authentication, multiple payment methods (Telebirr, Chapa, Bank Transfer), admin dashboard, and real-time notifications.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'TypeScript', 'Telebirr API'],
      link: 'https://e-commerce-frontend-4yol.onrender.com',
      github: 'https://github.com/tommsonn/E-commerce',
      featured: true,
      liveDemo: true
    },
    {
      title: 'MInT - Plan Monitoring and Evaluation',
      description: 'A comprehensive monitoring and evaluation platform for the Ethiopian Ministry of Innovation and Technology (MInT). Streamlines plan tracking, progress monitoring, and reporting for technology initiatives in Ethiopia.',
      image: '/mint-image.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express', 'Render'],
      link: 'https://planmonitoringandevaluationmint.onrender.com',
      github: 'https://github.com/tommsonn/MinT-Plan-Monitoring-And-Evaluation-system',
      featured: false,
      liveDemo: true
    },
    {
      title: 'Library Management System',
      description: 'A full-stack web application built with Spring Boot and React.js for efficient library operations. Features include book management, user roles, borrowing/returning books, and admin dashboards.',
      image: 'https://www.shutterstock.com/image-vector/cartoonstyle-vector-illustration-group-kids-600w-2250690681.jpg',
      tags: ['Spring Boot', 'React', 'PostgreSQL', 'Java', 'REST API', 'JWT'],
      link: '#',
      github: 'https://github.com/tommsonn/Springboot-webservice',
      featured: false,
      liveDemo: false
    },
    {
      title: 'Governance Policy Management System',
      description: 'A robust, production-grade microservices system for governance policy management. Features an API Gateway with JWT authentication, service discovery (Eureka), rate limiting (Redis), circuit breakers (Resilience4j), and internal gRPC communication between services. The system manages policy lifecycles and provides immutable audit logging through an event-driven architecture with Apache Kafka.',
      image: 'https://images.squarespace-cdn.com/content/v1/63a398ddcd5ee80243873df9/1672679960396-S5TP08TT08QIXZW5T7TW/EDUCATE.+ADVOCATE.+SUPPORT.+%281500+%C3%97+600+px%29+%2825%29.png',
      tags: ['Spring Boot', 'API Gateway', 'Kafka', 'PostgreSQL', 'Docker', 'gRPC', 'Eureka', 'Redis', 'Resilience4j', 'JWT'],
      link: '#',
      github: 'https://github.com/tommsonn/governance-policy-system',
      featured: false,
      liveDemo: false
    }
  ];

  // Sort projects - featured ones come first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

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
            ⭐ Featured Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProjects.map((project, index) => (
            <div 
              key={index} 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              <div className="relative h-[250px] overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
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

                {/* Live Demo Badge - Top Left */}
                {project.liveDemo && project.link !== '#' && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Live Demo
                    </span>
                  </div>
                )}
              </div>

              {/* Content - Full visibility */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </h3>
                
                {/* Full description - no truncation */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
                {/* All tags visible */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium"
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

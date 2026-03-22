import React from 'react';

function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="about">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          About Me
          <span className="block w-[100px] h-1 bg-gradient-to-r from-blue-100 to-purple-600 mt-4 mx-auto rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[25px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative rounded-[20px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 z-10"></div>
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="About"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Creative Developer & Designer
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                I'm a passionate developer with expertise in creating modern, responsive, and user-friendly web applications.
                With a strong foundation in both design and development, I bring ideas to life through clean code and creative solutions.
              </p>
              <p className="text-lg leading-relaxed">
                My journey in tech started with a curiosity for how things work, and has evolved into a career of building
                exceptional digital experiences. I specialize in front-end development with React, but I'm always eager to
                learn new technologies and expand my skill set.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-transparent transition-all duration-300">
                  <div className="text-center">
                    <h4 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      5+
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Projects Completed
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-transparent transition-all duration-300">
                  <div className="text-center">
                    <h4 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      3+
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Happy Clients
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-transparent transition-all duration-300">
                  <div className="text-center">
                    <h4 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      3+
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Years Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center gap-4 pt-6">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
function Skills() {
  const skills = [
    { name: 'React', level: 90, icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
    { name: 'JavaScript', level: 95, icon: '💛', color: 'from-yellow-400 to-amber-400' },
    { name: 'HTML/CSS', level: 95, icon: '🎨', color: 'from-orange-400 to-red-400' },
    { name: 'Node.js', level: 85, icon: '🟢', color: 'from-green-400 to-emerald-400' },
    { name: 'TypeScript', level: 80, icon: '💙', color: 'from-blue-400 to-indigo-400' },
    { name: 'Git', level: 90, icon: '📦', color: 'from-orange-400 to-red-400' },
    { name: 'UI/UX Design', level: 85, icon: '✨', color: 'from-purple-400 to-pink-400' },
    { name: 'Java', level: 75, icon: '☕', color: 'from-red-400 to-orange-400' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="skills">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          My Skills
          <span className="block w-[100px] h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 mx-auto rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300">
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <div className="relative">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                  <span className="absolute -top-6 right-0 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
function Skills() {
  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'JavaScript', level: 95, icon: '💛' },
    { name: 'HTML/CSS', level: 95, icon: '🎨' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'TypeScript', level: 80, icon: '💙' },
    { name: 'Git', level: 90, icon: '📦' },
    { name: 'UI/UX Design', level: 85, icon: '✨' },
    { name: 'Java', level: 75, icon: '☕' } // Changed from Responsive Design to Java
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#1a1a1a]" id="skills">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          My Skills
          <span className="block w-[100px] h-1 bg-[#ff8c42] mt-4 mx-auto rounded-sm"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-50 dark:bg-white/[0.05] p-8 rounded-[20px] border-2 border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-2.5 hover:border-[#ff8c42] hover:shadow-[0_15px_40px_rgba(255,140,66,0.2)] hover:bg-gray-100 dark:hover:bg-[#ff8c42]/[0.05]">
              <div className="text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{skill.name}</h3>
              <div className="bg-gray-300 dark:bg-white/10 h-3 rounded-[10px] overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#ff8c42] to-[#ff6b35] rounded-[10px] flex items-center justify-end pr-2 transition-all duration-1000 ease-out relative"
                  style={{ width: `${skill.level}%` }}
                >
                  <span className="text-xs font-bold text-white absolute right-2">{skill.level}%</span>
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
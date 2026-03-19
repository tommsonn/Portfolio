function About() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-white/[0.02]" id="about">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          About Me
          <span className="block w-[100px] h-1 bg-[#ff8c42] mt-4 mx-auto rounded-sm"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          <div className="relative rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[#ff8c42]/30 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About"
              className="w-full h-auto block transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div>
            <h3 className="text-3xl mb-6 text-[#ff8c42]">Creative Developer & Designer</h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70 mb-6">
              I'm a passionate developer with expertise in creating modern, responsive, and user-friendly web applications.
              With a strong foundation in both design and development, I bring ideas to life through clean code and creative solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70 mb-6">
              My journey in tech started with a curiosity for how things work, and has evolved into a career of building
              exceptional digital experiences. I specialize in front-end development with React, but I'm always eager to
              learn new technologies and expand my skill set.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6 bg-[#ff8c42]/10 dark:bg-[#ff8c42]/10 rounded-2xl border-2 border-[#ff8c42]/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff8c42] hover:shadow-[0_10px_30px_rgba(255,140,66,0.2)]">
                <h4 className="text-4xl font-extrabold text-[#ff8c42] mb-2">5+</h4>
                <p className="text-sm text-gray-500 dark:text-white/60 m-0">Projects Completed</p>
              </div>
              <div className="text-center p-6 bg-[#ff8c42]/10 dark:bg-[#ff8c42]/10 rounded-2xl border-2 border-[#ff8c42]/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff8c42] hover:shadow-[0_10px_30px_rgba(255,140,66,0.2)]">
                <h4 className="text-4xl font-extrabold text-[#ff8c42] mb-2">3+</h4>
                <p className="text-sm text-gray-500 dark:text-white/60 m-0">Happy Clients</p>
              </div>
              <div className="text-center p-6 bg-[#ff8c42]/10 dark:bg-[#ff8c42]/10 rounded-2xl border-2 border-[#ff8c42]/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff8c42] hover:shadow-[0_10px_30px_rgba(255,140,66,0.2)]">
                <h4 className="text-4xl font-extrabold text-[#ff8c42] mb-2">3+</h4>
                <p className="text-sm text-gray-500 dark:text-white/60 m-0">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

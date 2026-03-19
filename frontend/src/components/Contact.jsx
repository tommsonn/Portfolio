import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-[#1a1a1a]" id="contact">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          Get In Touch
          <span className="block w-[100px] h-1 bg-[#ff8c42] mt-4 mx-auto rounded-sm"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="text-3xl mb-4 text-[#ff8c42]">Let's work together!</h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70 mb-12">I'm always interested in hearing about new projects and opportunities.</p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="text-3xl bg-[#ff8c42]/10 w-[60px] h-[60px] rounded-2xl flex items-center justify-center border-2 border-[#ff8c42]/20">📧</div>
                <div>
                  <h4 className="text-lg mb-2 text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-white/70 m-0">thomastes433@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="text-3xl bg-[#ff8c42]/10 w-[60px] h-[60px] rounded-2xl flex items-center justify-center border-2 border-[#ff8c42]/20">📱</div>
                <div>
                  <h4 className="text-lg mb-2 text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-white/70 m-0">+251 94 128 7843</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="text-3xl bg-[#ff8c42]/10 w-[60px] h-[60px] rounded-2xl flex items-center justify-center border-2 border-[#ff8c42]/20">📍</div>
                <div>
                  <h4 className="text-lg mb-2 text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-white/70 m-0">Ethiopia, Addis Ababa</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-gray-100 dark:bg-white/[0.05] p-10 rounded-[20px] border-2 border-gray-200 dark:border-white/10" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-gray-900 dark:text-white/90 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full p-4 bg-white dark:bg-white/[0.05] border-2 border-gray-300 dark:border-white/10 rounded-[10px] text-gray-900 dark:text-white text-base font-sans transition-all duration-300 focus:outline-none focus:border-[#ff8c42] focus:bg-gray-50 dark:focus:bg-[#ff8c42]/[0.05] placeholder:text-gray-400 dark:placeholder:text-white/40"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-gray-900 dark:text-white/90 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full p-4 bg-white dark:bg-white/[0.05] border-2 border-gray-300 dark:border-white/10 rounded-[10px] text-gray-900 dark:text-white text-base font-sans transition-all duration-300 focus:outline-none focus:border-[#ff8c42] focus:bg-gray-50 dark:focus:bg-[#ff8c42]/[0.05] placeholder:text-gray-400 dark:placeholder:text-white/40"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 text-gray-900 dark:text-white/90 font-semibold">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                className="w-full p-4 bg-white dark:bg-white/[0.05] border-2 border-gray-300 dark:border-white/10 rounded-[10px] text-gray-900 dark:text-white text-base font-sans transition-all duration-300 focus:outline-none focus:border-[#ff8c42] focus:bg-gray-50 dark:focus:bg-[#ff8c42]/[0.05] placeholder:text-gray-400 dark:placeholder:text-white/40"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-gray-900 dark:text-white/90 font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full p-4 bg-white dark:bg-white/[0.05] border-2 border-gray-300 dark:border-white/10 rounded-[10px] text-gray-900 dark:text-white text-base font-sans transition-all duration-300 focus:outline-none focus:border-[#ff8c42] focus:bg-gray-50 dark:focus:bg-[#ff8c42]/[0.05] placeholder:text-gray-400 dark:placeholder:text-white/40 resize-y min-h-[120px]"
              ></textarea>
            </div>
            {message && (
              <div className={`mb-6 p-4 rounded-[10px] text-sm ${
                message.includes('Thank you') || message.includes('success')
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              }`}>
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 bg-[#ff8c42] text-white border-none rounded-[10px] text-base font-bold cursor-pointer transition-all duration-300 hover:bg-[#ff7a28] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,140,66,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

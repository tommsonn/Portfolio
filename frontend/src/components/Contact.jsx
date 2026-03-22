import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // REPLACE with your actual Render backend URL
  const API_URL = 'https://portfolio-bkvz.onrender.com/api'; // <-- USE YOUR ACTUAL URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Submitting to:', `${API_URL}/contact/submit`);
      
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setMessage(data.message || 'Failed to send message. Please try again.');
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="contact">
      <div className="max-w-[1280px] mx-auto px-8">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative text-gray-900 dark:text-white">
          Get In Touch
          <span className="block w-[100px] h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 mx-auto rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Let's work together!
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="group flex items-start gap-6 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-[60px] h-[60px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">thomastes433@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start gap-6 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-[60px] h-[60px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">+251 94 128 7843</p>
                </div>
              </div>

              {/* Location */}
              <div className="group flex items-start gap-6 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-[60px] h-[60px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Ethiopia, Addis Ababa</p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="flex items-center gap-4 pt-6">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form 
            className="relative group" 
            onSubmit={handleSubmit}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send me a message</h4>
              
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-y min-h-[120px]"
                  ></textarea>
                </div>

                {/* Message Alert */}
                {message && (
                  <div className={`p-4 rounded-xl text-sm ${
                    message.includes('Thank you') || message.includes('success')
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 group-hover/btn:bg-opacity-90">
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <Send className={`w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${
                      loading ? 'animate-pulse' : ''
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

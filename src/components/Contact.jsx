import { motion } from "framer-motion";
import { BiLogoGmail } from "react-icons/bi";
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Your email address where messages should be sent
    const yourEmail = 'sayanbanik459@gmail.com';
    
    // Create Gmail compose URL with pre-filled data
    const gmailSubject = `Portfolio Contact: ${subject}`;
    const gmailBody = `Hi Sayan,

I'm ${name} and I'm reaching out through your portfolio website.

${message}

Best regards,
${name}
${email}`;
    
    // Encode the parameters for URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(yourEmail)}&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-28" id="contact">
      <motion.div
        className="text-center mb-8 sm:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Get In <span className="text-white" style={{ WebkitTextStroke: "1px black" }}>Touch</span>
        </h2>
        <p className="text-[#71717A] text-sm sm:text-base max-w-2xl mx-auto px-4">
          I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16">
        <motion.div
          className="w-full lg:w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Let&apos;s Connect</h3>
          <p className="text-[#71717A] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            Feel free to reach out if you&apos;d like to collaborate on a project, discuss potential opportunities, or just say hello!
          </p>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <BiLogoGmail className="text-xl sm:text-2xl flex-shrink-0" />
              <span className="text-sm sm:text-base break-all">sayanbanik459@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <IoLogoLinkedin className="text-xl sm:text-2xl flex-shrink-0" />
              <span className="text-sm sm:text-base break-all">linkedin.com/in/sayanbanik</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <IoLogoTwitter className="text-xl sm:text-2xl flex-shrink-0" />
              <span className="text-sm sm:text-base">@sayan_banik</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <BsGithub className="text-xl sm:text-2xl flex-shrink-0" />
              <span className="text-sm sm:text-base break-all">github.com/sayan-banik</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="w-full lg:w-[55%] space-y-4 sm:space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors text-sm sm:text-base"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors resize-none text-sm sm:text-base"
              placeholder="Your message..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-black text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

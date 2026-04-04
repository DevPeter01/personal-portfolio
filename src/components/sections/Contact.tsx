import { motion } from 'framer-motion';
import { Mail, Phone, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';
import { Button } from '../ui/Button';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export const Contact = () => {
  const { contact } = profileData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL || "https://formspree.io/f/mojppevr", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully! I will get back to you soon.');
      } else {
        throw new Error('Formspree submission failed');
      }
    } catch (error) {
      console.error('Form Error:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-spiderman-dark via-spiderman-darker to-spiderman-dark" />
      <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '30px 30px' }} />

      {/* Animated web strands */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${20 + i * 15}%`}
            cy="50%"
            r={100 + i * 50}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-spiderman-red"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </svg>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span className="px-4 py-2 rounded-full bg-spiderman-red/10 border border-spiderman-red/30 text-spiderman-red text-sm font-semibold">
              GET IN TOUCH
            </span>
          </motion.div>
          
          <RevealText className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Contact Me
          </RevealText>
          
          <motion.div
            className="w-24 h-1 mx-auto bg-gradient-to-r from-spiderman-red to-spiderman-electricBlue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                Let's Work Together
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Have a project in mind or want to collaborate? Feel free to reach out. 
                I'm always open to discussing new opportunities and creative ideas.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <motion.a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-spiderman-red/50 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-medium">{contact.email}</div>
                </div>
              </motion.a>

              {contact.phone && (
                <motion.a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-spiderman-red/50 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-spiderman-blue to-spiderman-electricBlue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="text-white font-medium">{contact.phone}</div>
                  </div>
                </motion.a>
              )}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 font-heading">
                Connect With Me
              </h4>
              <div className="flex flex-wrap gap-3">
                {contact.social.map((social, index) => {
                  const Icon = iconMap[social.icon] || Github;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-gray-900/50 border border-gray-800 flex items-center justify-center hover:border-spiderman-red/50 transition-colors group"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-spiderman-red transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-gray-800'
                  } text-white focus:outline-none focus:border-spiderman-red transition-colors`}
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-800'
                  } text-white focus:outline-none focus:border-spiderman-red transition-colors`}
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Message textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                    errors.message ? 'border-red-500' : 'border-gray-800'
                  } text-white focus:outline-none focus:border-spiderman-red transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              {/* Submit button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

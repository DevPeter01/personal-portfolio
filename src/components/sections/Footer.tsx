import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { useSmoothScroll } from '../../utils/hooks';
import { useState, useEffect } from 'react';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export const Footer = () => {
  const { contact } = profileData;
  const { scrollToSection } = useSmoothScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <footer className="relative bg-spiderman-darker border-t border-gray-800 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '30px 30px' }} />
        
        {/* Animated web line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-spiderman-red to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <motion.div
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <circle cx="12" cy="12" r="2" />
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * Math.PI) / 4;
                      const x = 12 + Math.cos(angle) * 8;
                      const y = 12 + Math.sin(angle) * 8;
                      return (
                        <line
                          key={i}
                          x1="12"
                          y1="12"
                          x2={x}
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      );
                    })}
                  </svg>
                </div>
                <span className="font-heading font-bold text-xl text-white">
                  Peterfolio
                </span>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building digital experiences with creativity, precision, and passion.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-spiderman-red transition-colors text-sm text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-heading font-bold text-white mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {contact.social.map((social, index) => {
                  const Icon = iconMap[social.icon] || Github;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-900/50 border border-gray-800 flex items-center justify-center hover:border-spiderman-red/50 transition-colors text-gray-400 hover:text-spiderman-red"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-spiderman-red fill-current" />
              </motion.span>
              <span>by {profileData.personal.name}</span>
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Decorative web in corner */}
        <div className="absolute bottom-4 right-4 w-24 h-24 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 40 * Math.cos((i * Math.PI) / 4)}
                y2={50 + 40 * Math.sin((i * Math.PI) / 4)}
                stroke="currentColor"
                strokeWidth="1"
                className="text-spiderman-red"
              />
            ))}
          </svg>
        </div>
      </footer>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center shadow-lg shadow-spiderman-red/50 z-50"
          onClick={() => scrollToSection('hero')}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-spiderman-red opacity-50 blur-md"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </>
  );
};

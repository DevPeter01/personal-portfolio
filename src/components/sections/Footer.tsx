import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { useSmoothScroll } from '../../utils/hooks';
import { useState, useEffect } from 'react';

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

  const socials = [
    { id: 'github', icon: Github, url: contact.social.find(s => s.icon === 'github')?.url || 'https://github.com' },
    { id: 'linkedin', icon: Linkedin, url: contact.social.find(s => s.icon === 'linkedin')?.url || 'https://linkedin.com' },
    { id: 'email', icon: Mail, url: `mailto:${contact.email}` },
  ];

  return (
    <footer className="relative bg-spiderman-darker overflow-hidden py-24 md:py-32">
      {/* Background FX */}
      <div className="absolute inset-0 bg-web-pattern opacity-[0.03] pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spiderman-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            Ready to work with someone who can <span className="text-spiderman-red text-glow">build real systems?</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
            Open to internships and full-time opportunities. Let's discuss how I can contribute to your team's mission.
          </p>

          {/* Social Row */}
          <div className="flex justify-center items-center gap-8 md:gap-12">
            {socials.map((social, index) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-4 rounded-full bg-white/5 border border-white/5 hover:border-spiderman-red/30 transition-all duration-300"
                whileHover={{ scale: 1.15, y: -5 }}
              >
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-full bg-spiderman-red/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                
                <social.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-spiderman-red relative z-10 transition-colors" />
                
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-spiderman-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  {social.id}
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spider web detail in corner */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="0" cy="0" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-spiderman-red" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-spiderman-red" />
          <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-spiderman-red" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-spiderman-red" />
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={80 * Math.cos((i * Math.PI) / 10)}
              y2={80 * Math.sin((i * Math.PI) / 10)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-spiderman-red"
            />
          ))}
        </svg>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center shadow-lg shadow-spiderman-red/50 z-50 overflow-hidden"
          onClick={() => scrollToSection('hero')}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 bg-spiderman-red opacity-50 blur-md"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </footer>
  );
};

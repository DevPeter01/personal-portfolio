import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { RevealLetters, RevealText } from '../ui/RevealText';
import { GlowButton } from '../ui/GlowButton';
import { useSmoothScroll } from '../../utils/hooks';
import { useEffect, useState } from 'react';
import { SpiderWebBackground, CitySkyline } from '../ui/SpiderWeb';
import { SpiderDecor } from '../ui/SpiderDecor';
import { animations } from '../../utils/theme';

export const Hero = () => {
  const { personal, hero } = profileData;
  const { scrollToSection } = useSmoothScroll();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const [count, setCount] = useState({
    projects: 0,
    clients: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const projectIncrement = hero.stats.projects / steps;
    const clientIncrement = hero.stats.clients / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount({
          projects: Math.round(projectIncrement * currentStep),
          clients: Math.round(clientIncrement * currentStep),
        });
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hero.stats.projects, hero.stats.clients]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-spiderman-dark">
      {/* Spider-Man themed background */}
      <SpiderWebBackground variant="hero" />

      {/* Animated web lines spanning viewport */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-full origin-top"
          style={{
            left: `${(i + 1) * 8}%`,
            background: `linear-gradient(to bottom, 
              transparent, 
              rgba(230, 36, 41, ${0.1 + (i % 3) * 0.05}) 30%, 
              rgba(0, 217, 255, ${0.1 + (i % 2) * 0.05}) 70%, 
              transparent)`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
      ))}

      {/* City skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-60">
        <CitySkyline />
      </div>

      {/* Content with split layout */}
      <motion.div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ y }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Hanging badge with swing animation */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-spiderman-red/20 border-2 border-spiderman-red backdrop-blur-sm"
              initial={{ y: -50, opacity: 0, rotate: -10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={animations.webSwing}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-spiderman-red"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(230, 36, 41, 0.7)',
                    '0 0 0 8px rgba(230, 36, 41, 0)',
                    '0 0 0 0 rgba(230, 36, 41, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-spiderman-red font-bold tracking-wider">AVAILABLE FOR HIRE</span>
            </motion.div>

            {/* Name with comic-style emphasis */}
            <div className="relative mb-6">
              <RevealLetters
                className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2"
                delay={0.3}
              >
                {personal.name}
              </RevealLetters>
              {/* Comic slash accent */}
              <motion.div
                className="absolute -bottom-4 left-0 w-32 h-2 bg-gradient-to-r from-transparent via-spiderman-red to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{ clipPath: 'polygon(10% 0%, 90% 0%, 95% 100%, 5% 100%)' }}
              />
            </div>

            {/* Role with glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <RevealText
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-spiderman-electricBlue via-white to-spiderman-electricBlue bg-clip-text text-transparent"
                delay={0.8}
              >
                {personal.role}
              </RevealText>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTA Buttons with web-shoot effect */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <GlowButton
                variant="red"
                size="lg"
                onClick={() => scrollToSection('projects')}
              >
                <span className="text-lg font-bold">{hero.cta.primary}</span>
              </GlowButton>
              <GlowButton
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                <span className="text-lg font-bold">{hero.cta.secondary}</span>
              </GlowButton>
            </motion.div>

            {/* Stats with spider-sense ripple */}
            <motion.div
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <StatCard value={count.projects} label="Projects" />
              <StatCard value={hero.stats.experience} label="Experience" />
              <StatCard value={count.clients} label="Clients" />
            </motion.div>
          </div>

          {/* Right: Profile image with Spider-Man frame */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              {/* Spider emblem watermark behind */}
              <SpiderDecor type="spider-emblem" position="center" size="lg" opacity={0.1} className="-z-10" />
              
              {/* Profile image container with web frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Web outline tracing animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-spiderman-red"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-spiderman-electricBlue"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                
                {/* Mask-lens style frame */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700">
                  {/* Profile image with Spider-Man color grading */}
                  <img
                    src="/mm.jpeg"
                    alt="Peter - Portfolio"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.15) brightness(0.75) saturate(1.1) hue-rotate(-8deg)',
                      mixBlendMode: 'normal',
                    }}
                  />
                  
                  {/* Dark overlay to match theme */}
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Spider-Man color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-spiderman-red/15 via-transparent to-spiderman-blue/15 mix-blend-soft-light" />
                  
                  {/* Lens reflection effect */}
                  <div className="absolute top-8 left-12 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl" />
                </div>
                
                {/* Corner web decorations */}
                <SpiderDecor type="web-corner" position="top-left" size="sm" opacity={0.4} />
                <SpiderDecor type="web-corner" position="bottom-right" size="sm" opacity={0.4} />
                
                {/* Floating web strands */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 opacity-30"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <SpiderDecor type="web-strand" size="sm" opacity={0.6} animate={false} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with web animation */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollToSection('about')}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 w-12 h-12 rounded-full border-2 border-spiderman-red -m-2"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-spiderman-red transition-colors">
            <ArrowDown className="w-4 h-4 text-white group-hover:text-spiderman-red transition-colors" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// StatCard component
const StatCard = ({ value, label }: { value: number | string; label: string }) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ y: -8, scale: 1.05 }}
      transition={animations.webSwing}
    >
      {/* Spider-sense ripple on hover */}
      <motion.div
        className="absolute inset-0 -m-4 rounded-2xl border-2 border-spiderman-red opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.2, opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm overflow-hidden">
        {/* Halftone pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(230, 36, 41, 0.6) 1px, transparent 1px)',
            backgroundSize: '15px 15px',
          }}
        />
        
        {/* Comic corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-spiderman-red opacity-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
        
        <div className="relative z-10 text-center">
          <motion.div
            className="text-4xl md:text-5xl font-black text-white mb-2 font-heading"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {value}
          </motion.div>
          <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { RevealLetters, RevealText } from '../ui/RevealText';
import { GlowButton } from '../ui/GlowButton';
import { useSmoothScroll } from '../../utils/hooks';
import { animations } from '../../utils/theme';
import { HudAvatar } from '../ui/HudAvatar';
import { CinematicBackground } from '../ui/CinematicBackground';

export const Hero = () => {
  const { personal, hero } = profileData;
  const { scrollToSection } = useSmoothScroll();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020617' }}>
      {/* Multi-layer cinematic background system */}
      <CinematicBackground />

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
                  className="w-3 h-3 rounded-full bg-red-500"
                  animate={{
                    scale: [1, 1.4, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(239, 68, 68, 0.7)',
                      '0 0 0 10px rgba(239, 68, 68, 0)',
                      '0 0 0 0 rgba(239, 68, 68, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs sm:text-sm text-spiderman-red font-bold tracking-wider uppercase">
                  {hero.availability}
                </span>
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
                className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-spiderman-electricBlue via-white to-spiderman-electricBlue bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                delay={0.8}
              >
                {personal.role}
              </RevealText>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {personal.tagline}
            </motion.p>

            {/* Tech Stack Visual Cue */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {hero.techStack.map((tech, i) => (
                <div key={tech} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400 tracking-wide uppercase italic">{tech}</span>
                  {i < hero.techStack.length - 1 && (
                    <span className="text-spiderman-red/40 origin-center rotate-12">•</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons with web-shoot effect */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <GlowButton
                variant="red"
                size="lg"
                onClick={() => scrollToSection('projects')}
              >
                <div className="flex items-center gap-2 px-2">
                  <span className="text-lg font-bold">{hero.cta.primary}</span>
                  <ExternalLink className="w-5 h-5" />
                </div>
              </GlowButton>
              <a 
                href={hero.cta.resumeUrl} 
                download="Rohith-Resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="contents"
              >
                <GlowButton
                  variant="outline"
                  size="lg"
                >
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-lg font-bold">{hero.cta.secondary}</span>
                    <Download className="w-5 h-5" />
                  </div>
                </GlowButton>
              </a>
            </motion.div>

            {/* Proof Strip (Trust Building) */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {hero.proofStrip.map((item) => (
                <div 
                  key={item} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-spiderman-red/50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-spiderman-electricBlue group-hover:text-spiderman-red transition-colors" />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right: HudAvatar instead of profile image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HudAvatar />
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

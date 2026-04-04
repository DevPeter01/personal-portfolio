import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';
import { useRef } from 'react';

export const Experience = () => {
  const { experience } = profileData;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="relative py-24 md:py-40 overflow-hidden bg-spiderman-darker">
      {/* 🕸️ Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #E62429 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>
      
      {/* 🌌 Ambience Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-spiderman-red/10 blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-spiderman-electricBlue/5 blur-[150px] -z-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spiderman-red/10 border border-spiderman-red/20 mb-6"
          >
            <Briefcase className="w-4 h-4 text-spiderman-red" />
            <span className="text-xs font-black text-spiderman-red uppercase tracking-widest leading-none">Experience Timeline </span>
          </motion.div>
          
          <RevealText className="font-heading font-black text-5xl md:text-6xl lg:text-8xl text-white mb-8 uppercase tracking-tighter">
            The Multiverse Log
          </RevealText>
          
          <motion.div
            className="w-32 h-1.5 mx-auto bg-spiderman-red rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 128, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* 🧬 Combined Timeline System */}
        <div ref={containerRef} className="max-w-6xl mx-auto relative px-4 md:px-0">
          {/* 📍 Timeline Spine (The Web Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-spiderman-red via-spiderman-red to-transparent origin-top shadow-[0_0_15px_#E62429]"
            />
          </div>

          <div className="space-y-24 md:space-y-32">
            {experience.map((exp, index) => (
              <ExperienceEntry key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceEntry = ({ exp, index }: { exp: any; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* 🔮 Experience Card */}
      <motion.div 
        className="w-full md:w-[45%] group"
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
      >
        <div className="relative p-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-spiderman-red/30 transition-all duration-500 overflow-hidden">
          {/* Card Shimmer */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />
          
          <div className="relative p-8 md:p-10 z-10">
            {/* Period Badge */}
            <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} px-6 py-2 bg-gradient-to-br from-spiderman-red to-spiderman-darkRed text-white text-xs font-black tracking-widest rounded-bl-3xl md:rounded-br-3xl uppercase shadow-glow`}>
              {exp.period}
            </div>

            {/* Header */}
            <div className="mb-8 pt-4">
              <h3 className="text-3xl font-black text-white font-heading uppercase tracking-tight mb-2 group-hover:text-spiderman-red transition-colors duration-300">
                {exp.role}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <span className="flex items-center gap-1.5 font-bold text-spiderman-electricBlue/80 italic">
                  <Briefcase className="w-4 h-4" />
                  {exp.company}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-4 mb-10">
              {exp.description.map((bullet: string, i: number) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 text-gray-400 group/bullet"
                >
                  <div className="mt-1.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-spiderman-red group-hover/bullet:scale-125 transition-transform" />
                  </div>
                  <span className="text-base leading-relaxed group-hover/bullet:text-gray-200 transition-colors">{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {exp.tags.map((tag: string, i: number) => (
                <motion.span 
                  key={i}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(230, 36, 41, 0.2)', borderColor: '#E62429' }}
                  className="px-4 py-1.5 text-xs font-black bg-white/5 border border-white/10 text-gray-400 rounded-full uppercase tracking-tighter transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Spider-Suit Texture Accent */}
          <div className={`absolute bottom-0 ${isEven ? 'left-0' : 'right-0'} w-24 h-24 pointer-events-none opacity-[0.05]`}>
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-spiderman-red">
              <circle cx="50" cy="50" r="40" fill="none" strokeWidth="1" />
              <circle cx="50" cy="50" r="25" fill="none" strokeWidth="1" />
              <path d="M50 10 L50 90 M10 50 L90 50 M21.7 21.7 L78.3 78.3 M78.3 21.7 L21.7 78.3" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* 💓 Heartbeat Node */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
        <motion.div 
          className="w-8 h-8 rounded-full bg-spiderman-darker border-4 border-spiderman-red relative group/node cursor-pointer"
          whileHover={{ scale: 1.5 }}
        >
          {/* Heartbeat Pulse */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-spiderman-red opacity-50 blur-md"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Ripple on Hover */}
          <div className="absolute inset-0 rounded-full bg-spiderman-red opacity-0 group-hover/node:animate-ping group-hover:opacity-100" />
          
          {/* Inner Dot */}
          <div className="absolute inset-2 rounded-full bg-spiderman-red group-hover/node:scale-110 transition-transform" />
        </motion.div>
      </div>

      {/* 🚀 Empty Half for Layout Balance */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';
import { useState, useRef } from 'react';
import { 
  Code2, 
  Database, 
  Terminal, 
  Layers, 
  Cpu, 
  Globe, 
  Layout, 
  Smartphone, 
  Server, 
  GitBranch, 
  Figma, 
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';

// Icon mapping based on skill name
const getIcon = (name: string) => {
  const iconMap: Record<string, any> = {
    'React': Layout,
    'Tailwind CSS': Layers,
    'JavaScript': Code2,
    'Responsive UI': Smartphone,
    'TypeScript': Code2,
    'Node.js': Server,
    'Express.js': Cpu,
    'MongoDB': Database,
    'SQL': Database,
    'REST APIs': Globe,
    'Java': Terminal,
    'Python': Code2,
    'Git': GitBranch,
    'VS Code': Terminal,
    'Figma': Figma,
  };
  return iconMap[name] || CheckCircle2;
};

export const Skills = () => {
  const { skills } = profileData;
  const sectionRef = useRef<HTMLElement>(null);
  
  // Cursor Spotlight State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    if (!isInside) setIsInside(true);
  };

  const [isInside, setIsInside] = useState(false);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-24 md:py-32 overflow-hidden bg-spiderman-darker cursor-none select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {/* 🖱️ Custom Spider Cursor Overlay */}
      <AnimatePresence>
        {isInside && (
          <motion.div 
            className="absolute pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
            style={{
              left: mouseX,
              top: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* The Outer Crosshair */}
            <div className="absolute w-8 h-8 border border-spiderman-red/40 rounded-full animate-spin-slow" />
            <div className="absolute w-12 h-[1px] bg-spiderman-red/30" />
            <div className="absolute h-12 w-[1px] bg-spiderman-red/30" />
            
            {/* The Core Dot */}
            <div className="w-2 h-2 bg-spiderman-red rounded-full shadow-[0_0_10px_#E62429]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖱️ Cursor Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(230, 36, 41, 0.08), transparent 80%)`
          )
        }}
      />

      {/* 🕷️ Background Web Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="webPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L100 50 M50 0 L50 100 M0 0 L100 100 M100 0 L0 100" stroke="rgba(230, 36, 41, 0.2)" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="1.5" fill="rgba(230, 36, 41, 0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#webPattern)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spiderman-red/10 border border-spiderman-red/20 mb-6"
          >
            <Zap className="w-4 h-4 text-spiderman-red animate-pulse" />
            <span className="text-xs font-black text-spiderman-red uppercase tracking-widest leading-none">Power Grid Online </span>
          </motion.div>
          
          <RevealText className="font-heading font-black text-5xl md:text-6xl lg:text-8xl text-white mb-8 uppercase tracking-tighter">
            The Tech Network
          </RevealText>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/10" />
            <p className="text-gray-500 font-medium uppercase tracking-[0.3em] text-sm italic">Hiring Standard Ready</p>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>

        {/* 🏢 Interactive Skill Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {skills.map((category, idx) => (
            <SkillPanel key={category.category} category={category} index={idx} parentMouseX={mouseX} parentMouseY={mouseY} />
          ))}
        </div>
      </div>

    </section>
  );
};

const SkillPanel = ({ category, index }: any) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // 📐 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredSkill(null);
  };

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group p-0.5 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/5 shadow-2xl transition-all duration-500"
    >
      {/* 🕸️ Internal Web Flow Overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none opacity-20 transition-opacity group-hover:opacity-100">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M50 0 L50 100 M0 50 L100 50" 
            stroke="url(#webGlow)" 
            strokeWidth="0.5" 
            animate={{ opacity: [0.2, 0.5, 0.2] }} 
            transition={{ duration: 3, repeat: Infinity }} 
          />
          <defs>
            <linearGradient id="webGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E62429" stopOpacity="0" />
              <stop offset="50%" stopColor="#E62429" stopOpacity="1" />
              <stop offset="100%" stopColor="#E62429" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 💎 Panel Content */}
      <div className="relative p-10 py-12 z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-spiderman-darker/80 border border-white/10 flex items-center justify-center mb-6 shadow-glow transition-all group-hover:border-spiderman-red/50 group-hover:bg-spiderman-red/5">
            {index === 0 && <Layout className="w-8 h-8 text-spiderman-red" />}
            {index === 1 && <Server className="w-8 h-8 text-spiderman-red" />}
            {index === 2 && <ShieldCheck className="w-8 h-8 text-spiderman-red" />}
          </div>
          <h3 className="text-3xl font-black text-white font-heading uppercase tracking-widest text-center">
            {category.category}
          </h3>
        </div>

        {/* 🧬 Skill Nodes */}
        <div className="space-y-8 relative">
          {category.items.map((skill: any) => (
            <SkillItem 
              key={skill.name} 
              skill={skill} 
              isGlobalHovered={hoveredSkill !== null}
              isSelfHovered={hoveredSkill === skill.name}
              setHover={setHoveredSkill}
            />
          ))}
        </div>
      </div>

      {/* 🎨 Border Tracing Glow */}
      <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-spiderman-red/20 via-transparent to-spiderman-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

const SkillItem = ({ skill, isGlobalHovered, isSelfHovered, setHover }: any) => {
  const Icon = getIcon(skill.name);
  
  return (
    <motion.div
      onMouseEnter={() => setHover(skill.name)}
      onMouseLeave={() => setHover(null)}
      animate={{ 
        opacity: isGlobalHovered && !isSelfHovered ? 0.3 : 1,
        scale: isSelfHovered ? 1.05 : 1
      }}
      className="relative group/skill cursor-default"
    >
      {/* 🕸️ Animated Pulse Connection Overlay */}
      <AnimatePresence>
        {isSelfHovered && (
          <motion.div 
            className="absolute -inset-x-4 -inset-y-3 rounded-2xl bg-spiderman-red/10 border border-spiderman-red/20 z-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-start gap-5 z-10">
        <motion.div 
          animate={isSelfHovered ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, repeat: isSelfHovered ? Infinity : 0 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
            isSelfHovered ? 'bg-spiderman-red border-spiderman-red shadow-[0_0_20px_rgba(230,36,41,0.6)]' : 'bg-white/5 border-white/10'
          }`}
        >
          <Icon className={`w-6 h-6 transition-colors duration-300 ${isSelfHovered ? 'text-white' : 'text-gray-400'}`} />
        </motion.div>

        <div className="flex flex-col gap-1 pt-0.5">
          <h4 className={`text-xl font-black italic transition-colors duration-300 ${isSelfHovered ? 'text-white' : 'text-gray-300'}`}>
            {skill.name}
          </h4>
          <p className="text-sm text-gray-500 group-hover/skill:text-gray-400 transition-colors leading-relaxed line-clamp-2 italic">
            {skill.desc}
          </p>
        </div>
      </div>

      {/* 🚀 Laser Energy Flow Effect */}
      {isSelfHovered && (
        <motion.div 
          className="absolute left-0 top-1/2 w-4 h-1 bg-spiderman-red rounded-full -translate-x-full blur-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 10, opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

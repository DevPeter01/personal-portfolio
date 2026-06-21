import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

// Orbiting technology icons SVGs
const ReactIcon = () => (
  <svg className="w-5 h-5 text-spiderman-electricBlue" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(0 50 50)" />
    <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(120 50 50)" />
  </svg>
);

const NodeIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z M50 20 L25 35 L25 65 L50 80 L75 65 L75 35 Z" fillRule="evenodd" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 100 100" fill="currentColor">
    <rect x="10" y="10" width="80" height="80" rx="10" />
    <text x="18" y="70" fill="white" fontSize="55" fontWeight="bold" fontFamily="sans-serif">TS</text>
  </svg>
);

const MongoDBIcon = () => (
  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 5 C50 5 30 35 30 55 C30 75 40 90 50 95 C60 90 70 75 70 55 C70 35 50 5 Z M50 20 C53 35 60 50 60 60 C60 70 55 80 50 85 C45 80 40 70 40 60 C40 50 47 35 50 20 Z" />
  </svg>
);

const ExpressIcon = () => (
  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
    <text x="10" y="65" fontSize="55" fontWeight="black" fontFamily="monospace" letterSpacing="-4">ex</text>
  </svg>
);

export const HudAvatar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);
  
  // Custom rotation for orbiting icons using requestAnimationFrame to prevent re-renders
  const angle = useMotionValue(0);
  
  useAnimationFrame((time) => {
    // 0.0005 radians per millisecond
    angle.set((time * 0.0005) % (Math.PI * 2));
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate mouse position relative to center of avatar
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techIcons = [
    { component: <ReactIcon />, color: 'rgba(0, 217, 255, 0.2)' },
    { component: <NodeIcon />, color: 'rgba(16, 185, 129, 0.2)' },
    { component: <MongoDBIcon />, color: 'rgba(5, 150, 105, 0.2)' },
    { component: <TypeScriptIcon />, color: 'rgba(59, 130, 246, 0.2)' },
    { component: <ExpressIcon />, color: 'rgba(209, 213, 219, 0.2)' },
  ];

  return (
    <div 
      className="relative flex items-center justify-center w-[370px] h-[370px] md:w-[460px] md:h-[460px]"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, marginLeft: '-5px' }}
    >
      {/* Expanding Pulsing Energy Ring */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-spiderman-red/35 pointer-events-none"
          initial={{ width: 200, height: 200, opacity: 0.8 }}
          animate={{
            width: [200, 400],
            height: [200, 400],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Rotating outer technical ring (Dotted HUD) */}
      <motion.div 
        className="absolute w-[310px] h-[310px] md:w-[380px] md:h-[380px] rounded-full border-2 border-dashed border-spiderman-red/30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Rotating middle technical ring (Segmented circles) */}
      <motion.div 
        className="absolute w-[275px] h-[275px] md:w-[345px] md:h-[345px] rounded-full border border-double border-spiderman-electricBlue/40 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Radar sweep lines */}
      <motion.div 
        className="absolute w-[255px] h-[255px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden pointer-events-none z-10"
        style={{
          background: 'conic-gradient(from 0deg, rgba(230, 36, 41, 0.15) 0deg, rgba(230, 36, 41, 0) 90deg, transparent 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting Icons Container */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((icon, index) => {
          // Compute position based on angle
          const angleOffset = (index * 2 * Math.PI) / techIcons.length;
          
          return (
            <OrbitingIcon
              key={index}
              angleMotion={angle}
              offset={angleOffset}
              icon={icon.component}
              bgColor={icon.color}
            />
          );
        })}
      </div>

      {/* Centerpiece 3D Card (Tilt container) */}
      <motion.div
        className="relative w-52 h-52 md:w-[270px] md:h-[270px] rounded-full z-20 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {/* Glowing aura around avatar */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-spiderman-red via-spiderman-electricBlue to-spiderman-red opacity-40 blur-lg animate-pulse" />

        {/* Outer metallic HUD ring */}
        <div className="absolute -inset-1 rounded-full border-4 border-white/10 z-20 pointer-events-none" />

        {/* Circular image frame */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden border-4 border-spiderman-red bg-gradient-to-br from-spiderman-dark to-spiderman-darker shadow-[0_0_40px_rgba(230,36,41,0.4)]"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Web overlay grid on image */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none z-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
          />

          {/* Profile photo */}
          <img
            src="/mm.jpeg"
            alt="Rohith"
            className="w-full h-full object-cover select-none"
            style={{
              filter: 'contrast(1.1) brightness(0.85) saturate(1.1) hue-rotate(-5deg)',
            }}
          />

          {/* Glitch-like red/blue tint overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-spiderman-red/10 via-transparent to-spiderman-electricBlue/10 mix-blend-color-burn" />

          {/* Scan lines HUD overlay */}
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-25" />
        </div>
      </motion.div>
    </div>
  );
};

interface OrbitingIconProps {
  angleMotion: any;
  offset: number;
  icon: React.ReactNode;
  bgColor: string;
}

const OrbitingIcon = ({ angleMotion, offset, icon, bgColor }: OrbitingIconProps) => {
  const orbitRef = useRef<HTMLDivElement>(null);

  // Set transform values based on active angleMotion + offset
  useTransform(angleMotion, (val: number) => {
    if (!orbitRef.current) return;
    const finalAngle = val + offset;
    
    // Ellipse values
    const radiusX = window.innerWidth < 768 ? 145 : 190;
    const radiusY = window.innerWidth < 768 ? 68 : 90;

    const x = Math.cos(finalAngle) * radiusX;
    const y = Math.sin(finalAngle) * radiusY;
    
    // 3D parameters: when sin > 0, it's in front (larger scale, higher zIndex, opacity)
    const sin = Math.sin(finalAngle);
    const scale = 0.75 + (sin + 1) * 0.125; // 0.75 to 1.0
    const opacity = 0.4 + (sin + 1) * 0.3;  // 0.4 to 1.0
    const zIndex = sin > 0 ? 30 : 5;       // behind or in front of the avatar

    orbitRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    orbitRef.current.style.opacity = String(opacity);
    orbitRef.current.style.zIndex = String(zIndex);
  });

  return (
    <div
      ref={orbitRef}
      className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md transition-shadow hover:shadow-[0_0_15px_rgba(230,36,41,0.5)] cursor-pointer"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {icon}
    </div>
  );
};

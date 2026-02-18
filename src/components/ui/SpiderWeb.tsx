import { motion } from 'framer-motion';

interface SpiderWebBackgroundProps {
  variant?: 'section' | 'hero';
}

// Spider web background with halftone dots and corner webs
export const SpiderWebBackground = ({ variant = 'section' }: SpiderWebBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Halftone dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(230, 36, 41, 0.4) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Corner web strands */}
      <svg className="absolute top-0 left-0 w-48 h-48 opacity-30" viewBox="0 0 100 100">
        <path d="M0 0 L100 100 M20 0 L100 80 M0 20 L80 100" stroke="#E62429" strokeWidth="1" fill="none" />
        <circle cx="30" cy="30" r="2" fill="#E62429" />
        <circle cx="60" cy="60" r="2" fill="#E62429" />
      </svg>

      <svg className="absolute top-0 right-0 w-48 h-48 opacity-30" viewBox="0 0 100 100">
        <path d="M100 0 L0 100 M80 0 L0 80 M100 20 L20 100" stroke="#E62429" strokeWidth="1" fill="none" />
        <circle cx="70" cy="30" r="2" fill="#E62429" />
        <circle cx="40" cy="60" r="2" fill="#E62429" />
      </svg>

      {/* Floating glow orbs */}
      {variant === 'hero' && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(230, 36, 41, 0.15) 0%, transparent 70%)',
              top: '20%',
              left: '10%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 102, 204, 0.15) 0%, transparent 70%)',
              top: '50%',
              right: '10%',
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
    </div>
  );
};

// Spider emblem icon
export const SpiderEmblem = ({ className = '' }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <path
        d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 55 L30 70 L35 50 L20 35 L40 35 Z"
        fill="currentColor"
        className="text-spiderman-red"
      />
      <circle cx="50" cy="50" r="12" fill="currentColor" className="text-black" />
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 50;
        const y1 = 50;
        const x2 = 50 + Math.cos(angle) * 40;
        const y2 = 50 + Math.sin(angle) * 40;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-spiderman-red"
          />
        );
      })}
    </motion.svg>
  );
};

// Cityscape skyline with realistic buildings
export const CitySkyline = ({ className = '' }: { className?: string }) => {
  const buildings = [
    { x: 0, w: 60, h: 100 },
    { x: 50, w: 80, h: 140 },
    { x: 120, w: 40, h: 80 },
    { x: 150, w: 100, h: 160 },
    { x: 240, w: 60, h: 120 },
    { x: 290, w: 90, h: 180 },
    { x: 370, w: 70, h: 130 },
    { x: 430, w: 110, h: 150 },
    { x: 530, w: 50, h: 90 },
    { x: 570, w: 80, h: 170 },
    { x: 640, w: 100, h: 140 },
    { x: 730, w: 60, h: 110 },
    { x: 780, w: 120, h: 190 },
    { x: 890, w: 70, h: 130 },
    { x: 950, w: 90, h: 160 },
    { x: 1030, w: 60, h: 100 },
    { x: 1080, w: 80, h: 150 },
    { x: 1150, w: 50, h: 120 },
  ];

  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="buildingGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <linearGradient id="fogGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0a0a0f" />
        </linearGradient>
      </defs>

      {/* Buildings */}
      {buildings.map((b, i) => (
        <motion.g
          key={i}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.8 }}
        >
          {/* Building shape */}
          <rect
            x={b.x}
            y={200 - b.h}
            width={b.w}
            height={b.h}
            fill="url(#buildingGradient)"
            stroke="#2a2a4a"
            strokeWidth="0.5"
          />

          {/* Windows */}
          {[...Array(Math.floor(b.h / 25))].map((_, row) =>
            [...Array(Math.floor(b.w / 15))].map((_, col) => {
              const rand = Math.sin(i * 100 + row * 10 + col) * 0.5 + 0.5;
              if (rand > 0.6) {
                return (
                  <motion.rect
                    key={`${row}-${col}`}
                    x={b.x + 8 + col * 12}
                    y={200 - b.h + 10 + row * 20}
                    width="3"
                    height="4"
                    fill={rand > 0.9 ? '#00D9FF' : '#facc15'}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{
                      duration: 2 + rand * 3,
                      repeat: Infinity,
                      delay: rand * 5,
                    }}
                  />
                );
              }
              return null;
            })
          )}
        </motion.g>
      ))}

      {/* Bottom fog */}
      <rect x="0" y="170" width="1200" height="30" fill="url(#fogGradient)" />
    </svg>
  );
};

// Comic panel diagonal divider
export const ComicDivider = () => {
  return (
    <div className="absolute inset-x-0 h-px overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-spiderman-red to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-spiderman-red via-spiderman-electricBlue to-spiderman-red opacity-50 blur-sm"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  );
};

import { motion } from 'framer-motion';

interface SpiderDecorProps {
  type: 'spider-emblem' | 'web-corner' | 'web-strand' | 'halftone' | 'skyline';
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  animate?: boolean;
}

export const SpiderDecor = ({
  type,
  className = '',
  position = 'center',
  size = 'md',
  opacity = 0.3,
  animate = true,
}: SpiderDecorProps) => {
  const positions = {
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    center: 'absolute inset-0 flex items-center justify-center',
  };

  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const renderDecoration = () => {
    switch (type) {
      case 'spider-emblem':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 55 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor" className="text-spiderman-red" />
            <circle cx="50" cy="50" r="12" fill="currentColor" className="text-black" />
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI) / 4;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(angle) * 40}
                  y2={50 + Math.sin(angle) * 40}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-spiderman-red"
                />
              );
            })}
          </svg>
        );

      case 'web-corner':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0 0 L100 100" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" opacity="0.6" />
            <path d="M20 0 L100 80" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" opacity="0.4" />
            <path d="M0 20 L80 100" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" opacity="0.4" />
            <circle cx="30" cy="30" r="3" fill="currentColor" className="text-spiderman-red" opacity="0.7" />
            <circle cx="60" cy="60" r="3" fill="currentColor" className="text-spiderman-red" opacity="0.7" />
            <circle cx="90" cy="90" r="3" fill="currentColor" className="text-spiderman-red" opacity="0.7" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-electricBlue" opacity="0.3" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-electricBlue" opacity="0.3" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-electricBlue" opacity="0.3" />
          </svg>
        );

      case 'web-strand':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.line
              x1="10"
              y1="10"
              x2="90"
              y2="90"
              stroke="url(#strandGradient)"
              strokeWidth="2"
              initial={{ pathLength: animate ? 0 : 1 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="strandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E62429" />
                <stop offset="100%" stopColor="#00D9FF" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'halftone':
        return (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(230, 36, 41, 0.4) 1px, transparent 1px)',
              backgroundSize: '15px 15px',
            }}
          />
        );

      case 'skyline':
        return (
          <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,100 L0,60 L20,60 L20,40 L40,40 L40,80 L60,80 L60,20 L80,20 L80,70 L100,70 L100,30 L120,30 L120,90 L140,90 L140,50 L160,50 L160,100 Z"
              fill="currentColor"
              className="text-gray-900"
              opacity="0.4"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`${positions[position]} ${sizes[size]} ${className} opacity-${Math.round(opacity * 100)}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {renderDecoration()}
    </motion.div>
  );
};

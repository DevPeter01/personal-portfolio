import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card = ({ children, className = '', hover = true, glow = false }: CardProps) => {
  return (
    <motion.div
      className={`relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-spiderman-red/20 to-spiderman-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export const GlassCard = ({ children, className = '', tilt = true }: GlassCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={tilt ? {
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-spiderman-red/30 via-transparent to-spiderman-blue/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass card */}
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 overflow-hidden">
        {/* Web pattern overlay */}
        <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '20px 20px' }} />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-spiderman-red via-spiderman-electricBlue to-spiderman-red bg-clip-border animate-glow-pulse" />
        </div>
        
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ProjectCard = ({ children, className = '', onClick }: ProjectCardProps) => {
  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-spiderman-red via-spiderman-electricBlue to-spiderman-red rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

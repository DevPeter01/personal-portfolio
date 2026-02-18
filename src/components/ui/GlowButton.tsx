import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'red' | 'blue' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const GlowButton = ({
  children,
  onClick,
  variant = 'red',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: GlowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    red: 'bg-gradient-to-r from-spiderman-red to-spiderman-darkRed text-white',
    blue: 'bg-gradient-to-r from-spiderman-blue to-spiderman-electricBlue text-white',
    outline: 'border-2 border-spiderman-red text-spiderman-red bg-transparent',
  };

  const glowColors = {
    red: 'rgba(230, 36, 41, 0.6)',
    blue: 'rgba(0, 217, 255, 0.6)',
    outline: 'rgba(230, 36, 41, 0.4)',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative font-semibold rounded-xl transition-all duration-300 overflow-hidden ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        boxShadow: isHovered && !disabled
          ? `0 0 30px ${glowColors[variant]}, 0 0 60px ${glowColors[variant]}`
          : 'none',
      }}
    >
      {/* Web shoot line animation */}
      {isHovered && !disabled && (
        <>
          <motion.div
            className="absolute top-1/2 left-0 h-px bg-white"
            initial={{ width: 0, x: 0 }}
            animate={{ width: '100%', x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-white"
            initial={{ scale: 0, x: -50 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </>
      )}

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ scale: 1, opacity: 0 }}
        animate={
          isHovered && !disabled
            ? {
                scale: [1, 1.05, 1],
                opacity: [0, 0.5, 0],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        style={{
          border: `2px solid ${glowColors[variant]}`,
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

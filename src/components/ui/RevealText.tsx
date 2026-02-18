import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const RevealText = ({ children, className = '', delay = 0, once = true }: RevealTextProps) => {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface RevealLettersProps {
  children: string;
  className?: string;
  delay?: number;
}

export const RevealLetters = ({ children, className = '', delay = 0 }: RevealLettersProps) => {
  const letters = children.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export const GlitchText = ({ children, className = '' }: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="relative z-10"
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 opacity-0 text-spiderman-electricBlue"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [-2, 2, -2],
            transition: {
              duration: 0.2,
              repeat: 2,
            },
          },
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 opacity-0 text-spiderman-red"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [2, -2, 2],
            transition: {
              duration: 0.2,
              repeat: 2,
              delay: 0.1,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

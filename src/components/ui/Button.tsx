import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-spiderman-red to-spiderman-darkRed text-white hover:shadow-lg hover:shadow-spiderman-red/50',
    secondary: 'bg-gradient-to-r from-spiderman-blue to-spiderman-electricBlue text-white hover:shadow-lg hover:shadow-spiderman-blue/50',
    outline: 'border-2 border-spiderman-red text-spiderman-red hover:bg-spiderman-red hover:text-white',
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
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={false}
        animate={{ scale: [0, 2] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

interface WebButtonProps extends ButtonProps {
  showWeb?: boolean;
}

export const WebButton = ({ children, showWeb = true, ...props }: WebButtonProps) => {
  return (
    <motion.div className="relative inline-block">
      {showWeb && (
        <motion.div
          className="absolute -top-2 -left-2 w-full h-full border-2 border-spiderman-electricBlue rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      )}
      <Button {...props}>{children}</Button>
    </motion.div>
  );
};

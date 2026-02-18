// Spider-Man Portfolio Theme System

export const colors = {
  // Primary Colors
  spidermanRed: '#E62429',
  spidermanDarkRed: '#8B0000',
  spidermanBlue: '#0066CC',
  electricBlue: '#00D9FF',
  neonPurple: '#9D00FF',
  
  // Backgrounds
  darkBg: '#0A0A0F',
  darkerBg: '#050508',
  panelBg: 'rgba(10, 10, 15, 0.8)',
  
  // Glow Colors
  redGlow: 'rgba(230, 36, 41, 0.5)',
  blueGlow: 'rgba(0, 105, 204, 0.5)',
  purpleGlow: 'rgba(157, 0, 255, 0.5)',
} as const;

export const animations = {
  // Spring animations with overshoot (web swing feel)
  webSwing: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  
  webSwingStrong: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
  
  webSwingSlow: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
  },
  
  // Comic panel reveals
  comicSlide: {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
  },
  
  // Spider-sense pulse
  spiderSense: {
    duration: 0.8,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
} as const;

export const shadows = {
  redGlow: '0 0 30px rgba(230, 36, 41, 0.3), 0 0 60px rgba(230, 36, 41, 0.1)',
  blueGlow: '0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)',
  purpleGlow: '0 0 30px rgba(157, 0, 255, 0.3), 0 0 60px rgba(157, 0, 255, 0.1)',
  premium: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1)',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
} as const;

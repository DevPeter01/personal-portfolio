import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-spiderman-red via-spiderman-electricBlue to-spiderman-red origin-left z-[100]"
      style={{ scaleX }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-sm"
        style={{
          background: 'linear-gradient(90deg, rgba(230,36,41,0.8) 0%, rgba(0,217,255,0.8) 100%)',
          scaleX,
        }}
      />
    </motion.div>
  );
};

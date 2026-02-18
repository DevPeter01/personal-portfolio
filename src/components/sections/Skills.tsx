import { motion } from 'framer-motion';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';

export const Skills = () => {
  const { skills } = profileData;

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden bg-spiderman-darker">
      {/* Background */}
      <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span className="px-4 py-2 rounded-full bg-spiderman-blue/10 border border-spiderman-blue/30 text-spiderman-electricBlue text-sm font-semibold">
              TECH ARSENAL
            </span>
          </motion.div>
          
          <RevealText className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Skills & Expertise
          </RevealText>
          
          <motion.div
            className="w-24 h-1 mx-auto bg-gradient-to-r from-spiderman-electricBlue to-spiderman-red rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Skills grid */}
        <div className="max-w-6xl mx-auto space-y-12">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              {/* Category title */}
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white mb-8 font-heading"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 + 0.1 }}
              >
                <span className="text-spiderman-red">/</span> {category.category}
              </motion.h3>

              {/* Skills web grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative web connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E62429" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${20 * i}%`}
              y1="0%"
              x2={`${20 * i + 20}%`}
              y2="100%"
              stroke="url(#webGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: {
    name: string;
    level: number;
  };
  delay: number;
}

const SkillCard = ({ skill, delay }: SkillCardProps) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -5 }}
    >
      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-spiderman-red/20 to-spiderman-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
        />

        {/* Animated border trace */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="11"
              fill="none"
              stroke="url(#borderGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E62429" />
                <stop offset="50%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#E62429" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h4 className="text-xl font-bold text-white mb-4 font-heading">
            {skill.name}
          </h4>

          {/* Power meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Proficiency</span>
              <span className="text-spiderman-electricBlue font-bold">{skill.level}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-spiderman-red via-spiderman-electricBlue to-spiderman-red rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-50"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>

            {/* Level indicators */}
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => {
                const threshold = (i + 1) * 20;
                const isActive = skill.level >= threshold;
                return (
                  <motion.div
                    key={i}
                    className={`flex-1 h-1 rounded-full ${
                      isActive ? 'bg-spiderman-red' : 'bg-gray-800'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: isActive ? 1 : 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.5 + i * 0.05 }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Corner web decoration */}
        <div className="absolute top-2 right-2 w-8 h-8 opacity-20 pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="20" cy="4" r="2" fill="currentColor" className="text-spiderman-red" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
            <line x1="20" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
            <line x1="20" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

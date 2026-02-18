import { motion } from 'framer-motion';
import { Zap, Eye, Target, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';
import { GlassCard } from '../ui/Card';

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  eye: Eye,
  target: Target,
  users: Users,
};

export const About = () => {
  const { about } = profileData;

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-spiderman-dark via-spiderman-darker to-spiderman-dark" />
      <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '30px 30px' }} />

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
            <span className="px-4 py-2 rounded-full bg-spiderman-red/10 border border-spiderman-red/30 text-spiderman-red text-sm font-semibold">
              WHO I AM
            </span>
          </motion.div>
          
          <RevealText className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            About Me
          </RevealText>
          
          <motion.div
            className="w-24 h-1 mx-auto bg-gradient-to-r from-spiderman-red to-spiderman-electricBlue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Identity card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 overflow-hidden">
                {/* Diagonal accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-spiderman-red/20 to-transparent transform rotate-45 translate-x-32 -translate-y-32" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 font-heading">
                        {profileData.personal.name}
                      </h3>
                      <p className="text-spiderman-electricBlue font-medium">
                        {profileData.personal.role}
                      </p>
                    </div>
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                        <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    {about.story.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Location tag */}
                  <motion.div
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-300">{profileData.personal.location}</span>
                  </motion.div>
                </div>

                {/* Web pattern overlay */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + 40 * Math.cos((i * Math.PI) / 4)}
                        y2={50 + 40 * Math.sin((i * Math.PI) / 4)}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-spiderman-red"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Traits grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {about.traits.map((trait, index) => {
              const Icon = iconMap[trait.icon] || Zap;
              return (
                <GlassCard key={index} tilt={true}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-spiderman-red to-spiderman-darkRed flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2 font-heading">
                      {trait.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {trait.description}
                    </p>
                  </motion.div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Decorative web strand */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-spiderman-red/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </section>
  );
};

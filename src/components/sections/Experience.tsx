import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';

export const Experience = () => {
  const { experience } = profileData;

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
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
              MISSION LOG
            </span>
          </motion.div>
          
          <RevealText className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Experience
          </RevealText>
          
          <motion.div
            className="w-24 h-1 mx-auto bg-gradient-to-r from-spiderman-red to-spiderman-electricBlue rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Web strand path */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-spiderman-red via-spiderman-electricBlue to-spiderman-red transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2">
                  <motion.div
                    className={`relative bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-spiderman-red/20 to-spiderman-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10"
                    />

                    {/* Period badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-spiderman-red/10 border border-spiderman-red/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Briefcase className="w-4 h-4 text-spiderman-red" />
                      <span className="text-sm text-spiderman-red font-semibold">{exp.period}</span>
                    </motion.div>

                    {/* Role */}
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      {exp.role}
                    </h3>
                    
                    {/* Company */}
                    <p className="text-spiderman-electricBlue font-medium mb-4">
                      {exp.company}
                    </p>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-gray-300 text-sm flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                        >
                          <span className="text-spiderman-red mt-1">▸</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.05 }}
                          whileHover={{ scale: 1.1, borderColor: '#E62429' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Decorative corner web */}
                    <div className={`absolute bottom-4 ${index % 2 === 0 ? 'right-4' : 'left-4'} w-12 h-12 opacity-10`}>
                      <svg viewBox="0 0 48 48" className="w-full h-full">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                        <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                        <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-spiderman-red" />
                        {[...Array(8)].map((_, i) => (
                          <line
                            key={i}
                            x1="24"
                            y1="24"
                            x2={24 + 20 * Math.cos((i * Math.PI) / 4)}
                            y2={24 + 20 * Math.sin((i * Math.PI) / 4)}
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-spiderman-red"
                          />
                        ))}
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline node */}
                <motion.div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-spiderman-red to-spiderman-darkRed border-4 border-spiderman-darker z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-spiderman-red opacity-50 blur-md"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

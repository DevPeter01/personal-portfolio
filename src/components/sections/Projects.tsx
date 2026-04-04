import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Globe, Cpu, X, ChevronRight, Zap } from 'lucide-react';
import { useState } from 'react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';

const ProjectPlaceholder = ({ index }: { index: number }) => {
  const gradients = [
    'from-spiderman-red/20 to-spiderman-darkRed/40',
    'from-spiderman-electricBlue/20 to-spiderman-blue/40',
    'from-purple-500/20 to-indigo-500/40',
    'from-emerald-500/20 to-teal-500/40',
    'from-amber-500/20 to-orange-500/40',
    'from-rose-500/20 to-pink-500/40',
  ];

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} overflow-hidden`}>
      <div className="absolute inset-0 bg-web-pattern opacity-10 animate-pulse" style={{ backgroundSize: '15px 15px' }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <Cpu className="w-32 h-32 text-white animate-spin-slow" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-spiderman-darker to-transparent" />
    </div>
  );
};

export const Projects = () => {
  const { projects } = profileData;
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects;

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden bg-spiderman-darker">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full bg-web-pattern opacity-[0.03] pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-spiderman-red/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-spiderman-blue/5 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spiderman-red/10 border border-spiderman-red/20 mb-6"
          >
            <Zap className="w-4 h-4 text-spiderman-red animate-pulse" />
            <span className="text-spiderman-red text-xs font-bold tracking-widest uppercase">Intelligence Network</span>
          </motion.div>
          
          <RevealText className="font-heading font-black text-4xl md:text-6xl text-white mb-6 uppercase tracking-tighter">
            System Showcases
          </RevealText>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light"
          >
            Engineering robust technical ecosystems from <span className="text-spiderman-red font-semibold underline decoration-spiderman-red/30 underline-offset-4">satellite-powered AI</span> to <span className="text-spiderman-electricBlue font-semibold underline decoration-spiderman-electricBlue/30 underline-offset-4">real-time monitoring</span> systems.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow Border Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-spiderman-red/0 via-spiderman-red/50 to-spiderman-red/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm z-0" />
              
              <div 
                onClick={() => setSelectedProject(project)}
                className="relative z-10 h-full bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden">
                  <ProjectPlaceholder index={index} />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                       <Globe className="w-3.5 h-3.5 text-spiderman-red" />
                       <span className="text-white text-[10px] font-bold uppercase tracking-wider uppercase"> {project.category} </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-spiderman-red/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                    initial={false}
                  >
                    <div className="px-6 py-2 rounded-full bg-white text-spiderman-darker font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Analyze Intelligence <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-spiderman-red transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Micro Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] rounded uppercase font-bold tracking-wider bg-white/5 text-gray-400 group-hover:bg-spiderman-red/10 group-hover:text-spiderman-red transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-[10px] rounded text-gray-500 font-bold">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Intelligence Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              layoutId={selectedProject.id}
              className="relative w-full max-w-5xl bg-spiderman-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] z-[110]"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-[120] w-10 h-10 rounded-full bg-white/10 hover:bg-spiderman-red text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sidebar / Image (Desktop) */}
              <div className="w-full md:w-2/5 relative h-48 md:h-full bg-gray-900 border-r border-white/5">
                <ProjectPlaceholder index={projects.indexOf(selectedProject)} />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-spiderman-darker via-transparent to-transparent">
                  <div className="inline-flex mb-4 px-3 py-1 rounded bg-spiderman-red text-white text-xs font-bold uppercase tracking-widest self-start">
                    Active System
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight uppercase font-heading">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <section className="mb-10">
                  <h3 className="text-spiderman-red text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-spiderman-red" /> THE ARCHITECTURE
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                    "{selectedProject.fullDescription}"
                  </p>
                </section>

                <section className="mb-10">
                  <h3 className="text-spiderman-red text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-spiderman-red" /> SYSTEM INTELLIGENCE ROLE
                  </h3>
                  <div className="grid gap-4">
                    {selectedProject.role.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-spiderman-red/30 transition-colors group"
                      >
                        <div className="w-6 h-6 rounded bg-spiderman-red/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-spiderman-red transition-colors">
                          <Zap className="w-3.5 h-3.5 text-spiderman-red group-hover:text-white" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h3 className="text-spiderman-red text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-spiderman-red" /> TECH STACK UTILIZED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700 hover:border-spiderman-red transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-spiderman-red transition-colors font-bold uppercase tracking-widest text-xs"
                  >
                    <Github className="w-5 h-5" /> Source Intelligence
                  </a>
                  {selectedProject.live && (
                    <a 
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-spiderman-electricBlue transition-colors font-bold uppercase tracking-widest text-xs"
                    >
                      <ExternalLink className="w-5 h-5" /> Operational Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

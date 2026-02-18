import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { profileData } from '../../data/profileData';
import { RevealText } from '../ui/RevealText';
import { ProjectCard } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

type FilterType = 'all' | 'web' | 'ui' | 'backend';

export const Projects = () => {
  const { projects } = profileData;
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Web Apps', value: 'web' },
    { label: 'UI/UX', value: 'ui' },
    { label: 'Backend', value: 'backend' },
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden bg-spiderman-darker">
      {/* Background */}
      <div className="absolute inset-0 bg-web-pattern opacity-5" style={{ backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span className="px-4 py-2 rounded-full bg-spiderman-blue/10 border border-spiderman-blue/30 text-spiderman-electricBlue text-sm font-semibold">
              MY WORK
            </span>
          </motion.div>
          
          <RevealText className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Featured Projects
          </RevealText>
          
          <motion.div
            className="w-24 h-1 mx-auto bg-gradient-to-r from-spiderman-electricBlue to-spiderman-red rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-spiderman-red to-spiderman-darkRed text-white shadow-lg shadow-spiderman-red/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          layout
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-gray-700" fill="currentColor">
                    <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                  </svg>
                </div>
                {/* Halftone overlay */}
                <div className="absolute inset-0 bg-web-pattern opacity-10" style={{ backgroundSize: '10px 10px' }} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-3">
                  <motion.button
                    className="text-spiderman-electricBlue hover:text-spiderman-red transition-colors text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    View Details →
                  </motion.button>
                </div>
              </div>
            </ProjectCard>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        size="xl"
      >
        {selectedProject && (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading">
                {selectedProject.title}
              </h2>
              <p className="text-gray-400 text-lg">
                {selectedProject.fullDescription}
              </p>
            </div>

            {/* Image placeholder */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-24 h-24 text-gray-700" fill="currentColor">
                  <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-web-pattern opacity-10" style={{ backgroundSize: '20px 20px' }} />
            </div>

            {/* Role & Responsibilities */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3 font-heading">
                <span className="text-spiderman-red">/</span> Role & Responsibilities
              </h3>
              <ul className="space-y-2">
                {selectedProject.role.map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-2">
                    <span className="text-spiderman-red mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3 font-heading">
                <span className="text-spiderman-red">/</span> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: '#E62429' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {selectedProject.github && (
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedProject.github, '_blank')}
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </Button>
              )}
              {selectedProject.live && (
                <Button
                  variant="primary"
                  onClick={() => window.open(selectedProject.live, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

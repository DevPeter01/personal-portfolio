export interface ProfileData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    avatar?: string;
    location: string;
  };
  hero: {
    stats: {
      projects: number;
      experience: string;
      clients: number;
    };
    cta: {
      primary: string;
      secondary: string;
    };
  };
  about: {
    story: string[];
    traits: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  skills: {
    category: string;
    items: {
      name: string;
      level: number; // 0-100
      icon?: string;
    }[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string[];
    tags: string[];
  }[];
  projects: {
    id: string;
    title: string;
    category: 'web' | 'ui' | 'backend' | 'all';
    shortDescription: string;
    fullDescription: string;
    role: string[];
    technologies: string[];
    image?: string;
    github?: string;
    live?: string;
  }[];
  contact: {
    email: string;
    phone?: string;
    social: {
      platform: string;
      url: string;
      icon: string;
    }[];
  };
}

export const profileData: ProfileData = {
  personal: {
    name: 'Peter',
    role: 'Full Stack Developer (Intern) — Front-End Developer',
    tagline: 'Building responsive and scalable web apps with a focus on problem-solving, not just aesthetics',
    location: 'Namakkal, Tamil Nadu',
  },
  hero: {
    stats: {
      projects: 47,
      experience: '1+ Year',
      clients: 32,
    },
    cta: {
      primary: 'View Projects',
      secondary: 'Get In Touch',
    },
  },
  about: {
    story: [
      'Third-year B.E. CSE student with real industry experience as a Full Stack Developer Intern at Casagenix and Front-End Developer at Hindusthan Educational Institutions. Contributed to production-level development across UI/UX, API integration, testing, and deployment.',
      'Built responsive and scalable web apps with a focus on problem-solving, not just aesthetics. Currently exploring AI-driven systems and software engineering with the goal of becoming a job-ready developer capable of shipping real solutions.',
    ],
    traits: [
      {
        icon: 'zap',
        title: 'Fast Execution',
        description: 'Quick to develop and ship production-ready features across the full stack.',
      },
      {
        icon: 'eye',
        title: 'Detail Oriented',
        description: 'Improved accessibility, responsiveness, and layout structure across pages.',
      },
      {
        icon: 'target',
        title: 'Problem Solver',
        description: 'KEC National Hackathon Finalist & Road Safety Hackathon Semi Finalist (2025).',
      },
      {
        icon: 'users',
        title: 'Team Player',
        description: 'Worked across dev lifecycle: design, development, testing, deployment.',
      },
    ],
  },
  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 90 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Bootstrap', level: 85 },
        { name: 'JavaScript', level: 87 },
        { name: 'Responsive UI', level: 90 },
        { name: 'TypeScript', level: 75 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 85 },
        { name: 'MongoDB', level: 82 },
        { name: 'SQL', level: 80 },
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 65 },
      ],
    },
    {
      category: 'Languages & Tools',
      items: [
        { name: 'Java', level: 85 },
        { name: 'Python', level: 82 },
        { name: 'JavaScript', level: 87 },
        { name: 'Git', level: 88 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 80 },
      ],
    },
  ],
  experience: [
    {
      company: 'Casagenix (UK Based)',
      role: 'Full Stack Developer Intern',
      period: '2025 - Present',
      description: [
        'Contributed to modules in a contractor job & work order management platform',
        'Integrated REST APIs, improved UI responsiveness, and optimized component rendering',
        'Worked across dev lifecycle: design, development, testing, deployment',
      ],
      tags: ['React', 'REST APIs', 'UI/UX', 'Testing'],
    },
    {
      company: 'Hindusthan Educational Institutions',
      role: 'Front-End Developer',
      period: '2025 - Present',
      description: [
        'Developed production-level web pages using React, Tailwind and routing-based navigation',
        'Built dynamic components: data tables, category filters, and tabbed views',
        'Improved accessibility, responsiveness, and layout structure across pages',
      ],
      tags: ['React', 'Tailwind', 'Responsive Design', 'Accessibility'],
    },
    {
      company: 'StartUp Innovations',
      role: 'Junior Web Developer',
      period: '2019 - 2020',
      description: [
        'Developed and maintained client websites using modern frameworks',
        'Implemented responsive designs and ensured cross-browser compatibility',
        'Participated in agile development cycles and code reviews',
      ],
      tags: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'InterviewQB - Smart Interview Question Bank',
      category: 'web',
      shortDescription: 'Automated question generation, filtering, and assessment flow',
      fullDescription: 'Smart interview question bank system designed for students preparing for placements. Features automated question generation with structured practice sets, category-based filtering, and comprehensive assessment tracking to help students ace technical interviews.',
      role: [
        'Full-stack development',
        'Question generation system',
        'Filter & assessment logic',
        'Student-focused UI design',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      github: 'https://github.com',
    },
    {
      id: 'proj-2',
      title: 'AI Resume Advisor - Resume Improvement System',
      category: 'web',
      shortDescription: 'AI-Based Resume Improvement System',
      fullDescription: 'AI-powered resume analysis system that provides intelligent feedback and actionable suggestions for improvement. Uses advanced AI prompts to analyze resumes and suggest improvements focused on clarity, structure, ATS acceptance, and overall job readiness.',
      role: [
        'AI integration',
        'Feedback prompt engineering',
        'Resume parsing & analysis',
        'Improvement suggestion engine',
      ],
      technologies: ['React', 'Python', 'AI/ML', 'Natural Language Processing'],
      github: 'https://github.com',
    },
    {
      id: 'proj-3',
      title: 'Design System Library',
      category: 'ui',
      shortDescription: 'Comprehensive component library for rapid development',
      fullDescription: 'A modern, accessible design system built for consistency across products. Includes 50+ components, documentation, and Figma integration for design-to-code workflow.',
      role: [
        'Component architecture',
        'Documentation',
        'Accessibility compliance',
        'Theme system design',
      ],
      technologies: ['React', 'TypeScript', 'Storybook', 'CSS Modules', 'Figma'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
    {
      id: 'proj-4',
      title: 'REST API Backend',
      category: 'backend',
      shortDescription: 'Scalable microservices architecture',
      fullDescription: 'A robust backend API serving multiple client applications. Features authentication, rate limiting, caching, and comprehensive logging for enterprise-grade reliability.',
      role: [
        'API design',
        'Database optimization',
        'Security implementation',
        'Documentation',
      ],
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT', 'Docker'],
      github: 'https://github.com',
    },
    {
      id: 'proj-5',
      title: 'Portfolio Showcase',
      category: 'web',
      shortDescription: 'Animated portfolio with smooth interactions',
      fullDescription: 'A stunning portfolio website featuring advanced animations, scroll effects, and interactive elements. Built to showcase creative work with optimal performance.',
      role: [
        'Frontend development',
        'Animation implementation',
        'Performance optimization',
        'Responsive design',
      ],
      technologies: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
    {
      id: 'proj-6',
      title: 'Weather Dashboard',
      category: 'web',
      shortDescription: 'Real-time weather app with beautiful UI',
      fullDescription: 'A sleek weather application providing accurate forecasts with an intuitive interface. Features location-based weather, hourly/weekly forecasts, and weather maps.',
      role: [
        'API integration',
        'UI design',
        'Data visualization',
        'PWA implementation',
      ],
      technologies: ['Vue.js', 'TypeScript', 'Weather API', 'Chart.js', 'Tailwind'],
      live: 'https://demo.com',
    },
  ],
  contact: {
    email: 'rohithcs1414@gmail.com',
    phone: '+91 99526 52246',
    social: [
      { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/rohith-palanivel-a0089b304', icon: 'linkedin' },
      { platform: 'Instagram', url: 'https://www.instagram.com/xmnot_peter?igsh=MXI3MXQxcHdvZW9qZQ==', icon: 'instagram' },
      { platform: 'Dribbble', url: 'https://dribbble.com', icon: 'dribbble' },
    ],
  },
};

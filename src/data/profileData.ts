export interface ProfileData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    avatar?: string;
    location: string;
  };
  hero: {
    availability: string;
    techStack: string[];
    proofStrip: string[];
    stats: {
      projects: number | string;
      experience: string;
      clients?: number;
    };
    cta: {
      primary: string;
      secondary: string;
      resumeUrl?: string;
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
      desc: string;
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
    name: 'Rohith',
    role: 'MERN Stack Developer ',
    tagline: 'MERN Stack Developer with hands-on experience building scalable web applications, clean APIs, and production-ready user interfaces.',
    location: 'Coimbatore, Tamil Nadu',
  },
  hero: {
    availability: 'AVAILABLE FOR HIRE',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    proofStrip: ['2+ Internships', '5+ Projects Built', 'Hackathon Finalist'],
    stats: {
      projects: '5+',
      experience: '1+ Year',
    },
    cta: {
      primary: 'View My Work',
      secondary: 'Download Resume',
      resumeUrl: '/Rohith-Resume.pdf',
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
        { name: 'React', desc: 'Built scalable UI components and routing systems in real-world projects and internships' },
        { name: 'Tailwind CSS', desc: 'Developed responsive and modern UI with utility-first styling' },
        { name: 'JavaScript', desc: 'Strong in async programming, API integration, and debugging' },
        { name: 'Responsive UI', desc: 'Built mobile-friendly and accessible layouts across devices' },
        { name: 'TypeScript', desc: 'Used for type-safe components and improved code reliability' },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', desc: 'Built backend services and handled server-side logic' },
        { name: 'Express.js', desc: 'Developed REST APIs and middleware for scalable apps' },
        { name: 'MongoDB', desc: 'Designed schemas and handled database operations' },
        { name: 'SQL', desc: 'Worked with structured data and relational queries' },
        { name: 'REST APIs', desc: 'Integrated and built APIs for real-world applications' },
      ],
    },
    {
      category: 'Languages & Tools',
      items: [
        { name: 'Java', desc: 'Used for problem solving and backend logic' },
        { name: 'Python', desc: 'Applied in scripting and AI-related projects' },
        { name: 'Git', desc: 'Version control and collaborative workflows' },
        { name: 'VS Code', desc: 'Primary development environment' },
        { name: 'Figma', desc: 'Basic UI/UX design and prototyping' },
      ],
    },
  ],
  experience: [
    {
      company: 'Hindusthan Educational Institutions',
      role: 'Frontend Developer Intern',
      period: 'Sep 2025 – Feb 2026',
      description: [
        'Developed and maintained responsive React components for academic and administrative portals',
        'Built reusable UI modules including data tables, filters, and tab-based navigation systems',
        'Enhanced UI consistency, accessibility, and user experience across multiple modules',
      ],
      tags: ['React', 'Tailwind CSS', 'UI Components', 'Accessibility'],
    },
    {
      company: 'Casagenix (UK Based)',
      role: 'Full Stack Developer Intern',
      period: 'Jun 2025 – Jul 2026',
      description: [
        'Contributed to a contractor job and work-order management platform used for real-world operations',
        'Integrated and consumed REST APIs to manage workflows, status tracking, and data synchronization',
        'Improved component performance and UI responsiveness in React-based modules',
        'Collaborated across frontend, backend, testing, and deployment in an Agile environment',
      ],
      tags: ['React', 'Node.js', 'REST APIs', 'Agile'],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "College Website - Hindusthan Institute",
      category: "web",
      shortDescription: "Responsive multi-page academic website",
      fullDescription:
        "Designed and developed a responsive college website with structured routing and reusable components for academic and administrative content.",
      role: [
        "Frontend architecture design",
        "Built reusable UI components",
        "Implemented routing system",
        "Ensured responsive design"
      ],
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/skumarscse-skillsafari/hitech.git"
    },
    {
      id: "proj-2",
      title: "AquaNet AI - Satellite-Powered Fishing Intelligence",
      category: "web",
      shortDescription: "Satellite-based fishing zone predictor and route optimizer",
      fullDescription:
        "A comprehensive intelligence platform that fuses satellite oceanography (SST, Chlorophyll), Gradient Boosting ML models, and real-time weather to predict high-confidence fishing zones for Tamil Nadu fishermen. Features multi-objective route optimization and offline-first persistence for maritime operations.",
      role: [
        "Developed Gradient Boosting ML ensemble for species prediction",
        "Built interactive Leaflet.js maritime map with 4 layer modes",
        "Implemented multi-criteria route optimization algorithm",
        "Designed high-performance FastAPI backend with JWT protection"
      ],
      technologies: ["React", "FastAPI", "ML", "Leaflet.js", "Satellite Data"],
      github: "https://github.com/DevPeter01/AquaNet.git"
    },
    {
      id: "proj-3",
      title: "Sentinel - Real-Time Intelligence Monitoring System",
      category: "web",
      shortDescription: "Real-time OSINT data aggregation and analysis system",
      fullDescription:
        "Built a real-time monitoring system that aggregates multiple open-source intelligence (OSINT) data sources. Implemented backend APIs to process live data streams and developed interactive UI components to analyze patterns and detect anomalies.",
      role: [
        "Designed real-time data processing workflows",
        "Developed backend APIs for streaming data",
        "Built interactive visualization components",
        "Handled end-to-end system integration"
      ],
      technologies: ["React", "Node.js", "MongoDB", "REST APIs"],
      github: "https://github.com"
    },
    {
      id: "proj-4",
      title: "PlacementPrep - AI Interview Preparation Platform",
      category: "web",
      shortDescription: "AI-powered interview preparation and learning platform",
      fullDescription:
        "Developed a full-stack platform for company-specific interview preparation. Implemented adaptive learning roadmaps based on user performance and preparation timelines, helping users improve systematically.",
      role: [
        "Full-stack development",
        "Designed adaptive learning logic",
        "Built performance tracking system",
        "Developed user-focused UI flows"
      ],
      technologies: ["React", "Node.js", "MongoDB", "AI Integration"],
      github: "https://github.com/DevPeter01/PathForge.git"
    },
    {
      id: "proj-5",
      title: "Smart Campus Attendance & LMS",
      category: "web",
      shortDescription: "Automated attendance and learning management system",
      fullDescription:
        "Developed a smart campus system using Wi-Fi verification and face recognition for attendance tracking. Included scheduling, notifications, and reporting features for academic workflows.",
      role: [
        "Developed attendance tracking system",
        "Integrated authentication and verification",
        "Built scheduling and notification modules",
        "Handled system workflow automation"
      ],
      technologies: ["React", "Node.js", "MongoDB", "AI"],
      github: "https://github.com"
    },
    {
      id: "proj-6",
      title: "AI Resume Advisor",
      category: "web",
      shortDescription: "AI-based resume analysis and improvement system",
      fullDescription:
        "Built a resume analysis tool that evaluates structure, clarity, and ATS compatibility. Generates actionable suggestions using rule-based logic and AI-assisted prompts.",
      role: [
        "Designed resume parsing logic",
        "Implemented AI-based feedback system",
        "Built improvement suggestion engine",
        "Focused on ATS optimization"
      ],
      technologies: ["React", "Python", "AI", "NLP"],
      github: "https://github.com/DevPeter01/ai-resume-advisor.git"
    }
  ],
  contact: {
    email: 'rohithcs1414@gmail.com',
    phone: '+91 99526 52246',
    social: [
      { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rohith-palanivel-a0089b304', icon: 'linkedin' },
      { platform: 'Instagram', url: 'https://www.instagram.com/xmnot_peter?igsh=MXI3MXQxcHdvZW9qZQ==', icon: 'instagram' },
    ],
  },
};

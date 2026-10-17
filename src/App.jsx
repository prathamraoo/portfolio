
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const RobotScene = lazy(() => import('./components/RobotScene.jsx'));

const projects = [
  {
    id: '01',
    title: 'RoboSense',
    category: 'Robotics / Computer Vision',
    description:
      'An experimental robotics project exploring how camera-based object detection can connect visual perception with robot actions.',
    image: '/images/robosense.png',
    tone: 'mint',
    tags: ['Python', 'Computer Vision', 'Robotics'],
    github: 'https://github.com/prathamraoo/Robosense-ai',
    status: 'In development',
    details:
      'RoboSense explores the connection between computer vision and robotic actions. The project focuses on camera-based object detection, simulated robot behaviour, and the relationship between perception and control.',
    highlights: [
      'Camera-based object detection',
      'Computer vision and robot simulation',
      'Connecting perception with robot actions',
    ],
    stack: ['Python', 'Computer Vision', 'Robotics Simulation'],
  },
  {
    id: '02',
    title: 'CPRI ML',
    category: 'Machine Learning / Prediction',
    description:
      'A machine-learning workflow combining parameter prediction with validity classification, using Random Forest models and evaluation to understand model performance.',
    image: '/images/cpri-ml.png',
    tone: 'blue',
    tags: ['Python', 'Random Forest', 'Classification'],
    github:
      'https://github.com/prathamraoo/test-screening-ml-random-forest-',
    status: 'Project completed',
    details:
      'This machine-learning hackathon project works with engineering data to predict reference parameters and classify records as valid or invalid. It includes preprocessing, model training, evaluation, and threshold comparison.',
    highlights: [
      'Regression and classification workflow',
      'Random Forest model training',
      'Evaluation using accuracy, recall, and F1 score',
      'Decision-threshold comparison',
    ],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest'],
  },
  {
    id: '03',
    title: 'SmartRouteFinder',
    category: 'C++ / Data Structures & Algorithms',
    description:
      "A route-finding application that uses graph algorithms to find paths between locations and compare Dijkstra's algorithm with BFS.",
    image: '/images/smartroutefinder.png',
    tone: 'orange',
    tags: ['C++17', 'Dijkstra', 'BFS'],
    github: 'https://github.com/prathamraoo/SmartRouteFinder',
    status: 'Project completed',
    details:
      'SmartRouteFinder represents locations as a graph and uses pathfinding algorithms to explore routes. It compares Dijkstra’s shortest-path approach with Breadth-First Search and displays route statistics.',
    highlights: [
      'Graph-based location and route representation',
      'Dijkstra shortest-path algorithm',
      'Breadth-First Search comparison',
      'Route distance and network statistics',
    ],
    stack: ['C++17', 'Graphs', 'Dijkstra', 'BFS'],
  },
  {
    id: '04',
    title: 'Skybook',
    category: 'Full-Stack Web Application',
    description:
      'A flight-booking application concept with flight discovery, seat selection, booking management, payment flow, and an administration dashboard.',
    image: '/images/skybook.png',
    tone: 'violet',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/prathamraoo/Flightmangmentsystem',
    status: 'Project in progress',
    details:
      'Skybook is a full-stack flight-booking system designed around passenger and administrator workflows. The application brings together flight discovery, booking management, seat availability, payment flow, and administrative controls.',
    highlights: [
      'Flight and airport management',
      'Passenger booking workflow',
      'Seat availability and booking status',
      'Administrative management dashboard',
    ],
    stack: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'MUI'],
  },
];

const skills = [
  {
    number: '01',
    title: 'Programming',
    description: 'The foundations I build with.',
    items: ['C', 'C++', 'Python', 'JavaScript'],
  },
  {
    number: '02',
    title: 'AI & Robotics',
    description: 'Making software interact with the world.',
    items: ['Machine Learning', 'Computer Vision', 'Robotics'],
  },
  {
    number: '03',
    title: 'Web & Data',
    description: 'Building applications and working with data.',
    items: ['React', 'SQL', 'MongoDB', 'Node.js'],
  },
  {
    number: '04',
    title: 'Cloud',
    description: 'Exploring modern cloud technologies.',
    items: ['Cloud Fundamentals', 'AWS'],
  },
];

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-line" />
      <span>{children}</span>
    </div>
  );
}

function SourceCodeButton({ project, compact = false }) {
  return (
    <a
      className={`source-code-button ${compact ? 'source-code-compact' : ''}`}
      href={project.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${project.title} source code on GitHub`}
      onClick={(event) => event.stopPropagation()}
    >
      <Github size={15} />
      <span>{compact ? 'Code' : 'View source code'}</span>
      <ArrowUpRight size={14} />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#home"
        onClick={closeMenu}
        aria-label="My Portfolio home"
      >
        <span className="brand-symbol">P.</span>
        <span>MY PORTFOLIO</span>
      </a>

      <button
        className="mobile-menu"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav
        className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
        aria-label="Main navigation"
      >
        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#toolkit" onClick={closeMenu}>
          Toolkit
        </a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero section-wrap" id="home">
      <motion.div
        className="hero-copy"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="eyebrow">
          <span className="status-dot" />
          ROBOTICS & AI ENGINEERING STUDENT
        </div>

        <h1>
          Building things
          <br />
          that <span>think.</span>
        </h1>

        <p className="hero-intro">
          I&apos;m an engineering student interested in robotics,
          artificial intelligence, and building software that solves real
          problems.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowUpRight size={17} />
          </a>

          <a className="text-link" href="#contact">
            Get in touch <ArrowRight size={16} />
          </a>
        </div>

        <p className="hero-footnote">
          <span>01</span> CURIOUS BY NATURE. BUILDER BY CHOICE.
        </p>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <div className="visual-topline">
          <span>ROBOTICS LAB / 001</span>
          <span>LIVE SCENE</span>
        </div>

        <div className="robot-canvas">
          <Suspense
            fallback={
              <div className="canvas-fallback">
                <span className="status-dot" />
                Loading 3D robot scene...
              </div>
            }
          >
            <RobotScene />
          </Suspense>
        </div>

        <div className="visual-coordinates">
          <span>PERCEPTION</span>
          <span>→</span>
          <span>DECISION</span>
          <span>→</span>
          <span>ACTION</span>
        </div>

        <div className="visual-caption">
          <span className="caption-line" />
          <span>EXPERIMENTING WITH INTELLIGENT SYSTEMS</span>
        </div>
      </motion.div>

      <a className="scroll-cue" href="#projects">
        <ArrowDownRight size={16} /> SCROLL TO EXPLORE
      </a>
    </section>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card ${project.tone}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <button
        type="button"
        className="project-art"
        onClick={() => onOpen(project)}
        aria-label={`View details for ${project.title}`}
      >
        <img
          className="project-card-image"
          src={project.image}
          alt={`${project.title} project visual`}
          loading="lazy"
        />

        <span className="project-art-shade" />

        <span className="project-index">{project.id}</span>

        <span className="project-glyph">
          <ArrowUpRight size={19} />
        </span>

        <span className="project-art-note">
          PROJECT / {project.id}
        </span>
      </button>

      <div className="project-info">
        <div className="project-detail-line">{project.category}</div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="view-details-button"
            onClick={() => onOpen(project)}
          >
            VIEW DETAILS <ArrowUpRight size={16} />
          </button>

          <SourceCodeButton project={project} compact />
        </div>

        <div className="project-status-row">
          <span className="status-dot" />
          <span>{project.status}</span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`project-modal ${project.tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="project-modal-topline">
          <span>
            PROJECT / {project.id} — {project.category}
          </span>

          <button
            type="button"
            className="project-modal-x"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="project-modal-mark">
          <span>{project.id}</span>
          <span className="label-line" />
          <span>SELECTED WORK</span>
        </div>

        <div className="project-modal-image-wrap">
          <img
            className="project-modal-image"
            src={project.image}
            alt={`${project.title} detailed project preview`}
          />
        </div>

        <h2 id="project-modal-title">{project.title}</h2>

        <p className="project-modal-description">{project.details}</p>

        <div className="project-modal-detail">
          <h3>What&apos;s inside</h3>

          <ul className="project-modal-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={16} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-modal-stack">
          <h3>TECH STACK</h3>
          <div className="project-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="project-modal-actions">
          <SourceCodeButton project={project} />

          <button
            type="button"
            className="button"
            onClick={onClose}
          >
            Back to projects <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="section-block section-wrap" id="projects">
      <SectionLabel number="01">SELECTED WORK</SectionLabel>

      <div className="section-heading-row">
        <div>
          <h2>
            Things I&apos;ve
            <br />
            <span>been building.</span>
          </h2>
        </div>

        <p>
          A collection of experiments, engineering projects, and software
          built while learning by doing.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      <div className="projects-footer">
        <span>MORE EXPERIMENTS. MORE THINGS TO LEARN.</span>

        <a
          className="text-link"
          href="https://github.com/prathamraoo"
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={16} />
        </a>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function About() {
  return (
    <section className="section-block section-wrap" id="about">
      <SectionLabel number="02">A LITTLE ABOUT ME</SectionLabel>

      <div className="about-grid">
        <div className="about-heading">
          <h2>
            Learning by
            <br />
            <span>making.</span>
          </h2>

          <div className="about-stamp">
            <Code2 size={25} />
            <span>ALWAYS BUILDING</span>
          </div>
        </div>

        <div className="about-body">
          <p className="about-lead">
            I&apos;m a Robotics and Artificial Intelligence Engineering
            student at Manipal Institute of Technology, Bengaluru.
          </p>

          <p>
            I enjoy exploring how software, data, and physical systems come
            together. From experimenting with machine learning to building
            web applications and working with robotics simulations, I learn
            best by creating things and working through the problems that
            come with them.
          </p>

          <p>
            Right now, I&apos;m strengthening my foundations in programming,
            AI, robotics, and engineering while building projects that help
            me turn what I learn into something practical.
          </p>

          
<div className="education-list">
  
  <div className="education-strip">
    

    <div className="education-image-wrap">
      <img
        src="/images/mit-bengaluru.jpg"
        alt="Manipal Institute of Technology, Bengaluru"
        className="education-image"
      />
    </div>

    <div className="education-info">
      <strong>Robotics & AI Engineering</strong>
      <span>Manipal Institute of Technology, Bengaluru</span>
    </div>

    <span className="education-year">2026 — 2029</span>
  </div>

  <div className="education-strip">
    

    <div className="education-image-wrap">
      <img
        src="/images/vivekananda-polytechnic.jpg"
        alt="Vivekananda Polytechnic College, Puttur"
        className="education-image"
      />
    </div>

    <div className="education-info">
      <strong>Computer Science and Engineering</strong>
      <span>Vivekananda Polytechnic College, Puttur</span>
    </div>

    <span className="education-year">Diploma</span>
  </div>
</div>

          
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section-block section-wrap" id="toolkit">
      <SectionLabel number="03">MY TOOLKIT</SectionLabel>

      <div className="section-heading-row">
        <div>
          <h2>
            Tools I&apos;m
            <br />
            <span>working with.</span>
          </h2>
        </div>

        <p>
          The languages, technologies, and concepts I use while building
          projects and developing my engineering skills.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.number}>
            <div className="skill-card-top">
              <span>{skill.number}</span>
              <ArrowUpRight size={17} />
            </div>

            <h3>{skill.title}</h3>
            <p>{skill.description}</p>

            <div className="skill-rule" />

            <div className="project-tags">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="skills-note">
        <span className="status-dot" />
        ALWAYS LEARNING. ALWAYS EXPERIMENTING.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="section-block section-wrap" id="contact">
      <SectionLabel number="04">LET&apos;S CONNECT</SectionLabel>

      <div className="contact-panel">
        <div className="contact-orbit orbit-one" />
        <div className="contact-orbit orbit-two" />

        <div className="contact-index">OPEN TO LEARNING & COLLABORATION</div>

        <h2>
          Have something
          <br />
          <span>interesting in mind?</span>
        </h2>

        <p>
          I&apos;m always interested in learning from people, exploring
          ideas, and building useful things together.
        </p>

        <a
          className="button button-primary"
          href="mailto:prathamrao48156@gmail.com"
        >
          <Mail size={17} /> Say hello <ArrowUpRight size={17} />
        </a>

        <div className="contact-links">
          <a
            href="https://github.com/prathamraoo"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub <ArrowUpRight size={14} />
          </a>

          <a
            href="https://www.linkedin.com/in/pratham-rao-151a3243a/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
          </a>

          <a href="mailto:prathamrao48156@gmail.com">
            <Mail size={17} /> Email <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="brand" href="#home">
        <span className="brand-symbol">P.</span>
        <span>MY PORTFOLIO</span>
      </a>

      <p className="footer-note">
        Designed around curiosity. Built one step at a time.
      </p>

      <div className="social-links">
        <a
          href="https://github.com/prathamraoo"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github size={17} />
        </a>

        <a
          href="https://www.linkedin.com/in/pratham-rao-151a3243a/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={17} />
        </a>

        <a
          href="mailto:prathamrao48156@gmail.com"
          aria-label="Email"
        >
          <Mail size={17} />
        </a>
      </div>

      <span className="copyright">
        © {new Date().getFullYear()} MY PORTFOLIO
      </span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Toolkit />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

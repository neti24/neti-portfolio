import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Moon, Sun, Menu, X, ArrowDown, ArrowUpRight,
  Cloud, ServerCog, Code2, Zap, Mail, Phone, MapPin,
  Award, BookOpen, ChevronRight, Terminal,
  Shield, Database, Activity, GitBranch, Box
} from 'lucide-react';

// Inline brand SVGs (not in this lucide-react version)
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import './style.css';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

const SKILL_CATEGORIES = [
  {
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    items: ['AWS (EC2, S3, EKS, IAM, VPC, RDS, Lambda)', 'Terraform', 'CloudFormation', 'Linux / Ubuntu'],
  },
  {
    label: 'Containers & Orchestration',
    icon: Box,
    items: ['Kubernetes / EKS', 'Docker', 'Helm'],
  },
  {
    label: 'CI/CD & GitOps',
    icon: GitBranch,
    items: ['Jenkins', 'Argo CD', 'GitHub Actions'],
  },
  {
    label: 'Observability & Security',
    icon: Activity,
    items: ['Prometheus', 'Grafana', 'Trivy / SonarQube'],
  },
  {
    label: 'Languages & Scripting',
    icon: Code2,
    items: ['Python', 'Bash / Shell', 'YAML / HCL', 'SQL'],
  },
  {
    label: 'Storage & Data',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'S3 / Object Storage', 'Redis'],
  },
];

const EXPERIENCE = [
  {
    hash: 'a1b2c3d',
    period: 'Dec 2025 – Present',
    duration: '3+ yrs · ongoing',
    role: 'Senior Engineer',
    company: 'Qualcomm',
    location: 'San Diego, CA',
    tag: 'PRESENT',
    bullets: [
      'Led DevOps, cloud and DVT initiatives for RF test infrastructure serving 10+ hardware programs.',
      'Built event-driven RF data processing pipeline on AWS (S3, Lambda, SQS) — cut analysis time by 90%.',
      'Designed GitOps platform on Amazon EKS with Helm + Argo CD; deployments became repeatable, auditable and zero-touch.',
      'Authored reusable Terraform modules for networking, IAM, compute, storage and Kubernetes — consistent multi-environment provisioning.',
      'Reduced test execution time by 30% through distributed DVT framework connecting lab assets, CI/CD and reporting.',
      'Maintained 24/7 lab readiness and collaborated across firmware, hardware and software engineering teams.',
    ],
  },
  {
    hash: '9e8f7a1',
    period: 'Aug 2022 – Nov 2025',
    duration: '2 yrs',
    role: 'DevOps / Cloud Engineer',
    company: 'Cloud Engineering',
    location: 'Remote',
    tag: 'FOUNDATION',
    bullets: [
      'Built hands-on expertise in AWS, infrastructure automation, containers and deployment pipelines.',
      'Implemented CI/CD workflows with Jenkins and GitLab CI/CD for multiple product teams.',
      'Containerised legacy services with Docker; orchestrated workloads on Kubernetes.',
      'Established observability baselines with Prometheus, Grafana and ELK Stack.',
      'Automated infrastructure provisioning with Terraform and CloudFormation.',
    ],
  },
];

const PROJECTS = [
  {
    tag: 'automation',
    title: 'RF Test Automation Platform',
    desc: 'Event-driven RF data processing, anomaly detection and reporting using AWS S3, Lambda, SQS, Python and Jenkins. Replaced manual analysis with fully automated pipelines.',
    outcome: '30% faster execution · 90% less analysis time',
    gradient: 'g0',
  },
  {
    tag: 'gitops',
    title: 'GitOps on Amazon EKS',
    desc: 'Version-controlled deployments with Helm and Argo CD. Automated validation, canary rollouts and self-healing recovery. Every release is a Git commit.',
    outcome: 'Repeatable, auditable, zero-touch releases',
    gradient: 'g1',
  },
  {
    tag: 'infrastructure',
    title: 'AWS Infrastructure as Code',
    desc: 'Reusable Terraform modules covering networking, IAM, compute, storage and Kubernetes. Same workflow across dev, staging and production environments.',
    outcome: 'Consistent multi-environment provisioning',
    gradient: 'g2',
  },
  {
    tag: 'platform',
    title: 'Distributed DVT Framework',
    desc: 'Large-scale device validation framework connecting lab assets, CI/CD pipelines, data processing and reporting dashboards. Handles parallel test execution at scale.',
    outcome: 'Reliable test execution at scale',
    gradient: 'g3',
  },
];

const CERTS = [
  {
    title: 'AWS Certified Cloud Practitioner – Foundational',
    issuer: 'Amazon Web Services',
    status: 'earned',
    icon: Award,
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'The Linux Foundation · CNCF',
    status: 'preparing',
    icon: Shield,
    note: 'Preparing for the hands-on CKA exam — cluster setup, networking, storage, security and live troubleshooting.',
  },
];

const STATS = [
  { value: 4, suffix: '+', label: 'Years in DevOps & Cloud' },
  { value: 30, suffix: '%', label: 'Faster test execution' },
  { value: 90, suffix: '%', label: 'Less manual analysis' },
  { value: 10, suffix: '+', label: 'Hardware programs served' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return [count, ref];
}

function StatCard({ value, suffix, label }) {
  const [count, ref] = useCounter(value);
  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-num">{count}<em>{suffix}</em></span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, children, copy }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="sec-heading">
      <small>{eyebrow}</small>
      <h2>{children}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      className="scroll-hint"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
      >
        <ArrowDown size={16} />
      </motion.span>
      <span>scroll</span>
    </motion.div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.35 }
    );
    NAV.forEach(n => {
      const el = document.getElementById(n.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div className="app">

      {/* ── HEADER ── */}
      <header>
        <button className="brand" onClick={() => go('about')}>
          <b>NS</b>
          <span>Neti Sharma</span>
        </button>

        <nav>
          {NAV.map(x => (
            <button
              key={x}
              onClick={() => go(x)}
              className={activeSection === x.toLowerCase() ? 'active' : ''}
            >
              {x}
            </button>
          ))}
        </nav>

        <div className="actions">
          <a
            href="/Resume_Neti.pdf"
            download
            className="resume-btn"
          >
            Resume
          </a>
          <button className="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon mobile" onClick={() => setMenu(!menu)}>
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              className="drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {NAV.map(x => (
                <button key={x} onClick={() => go(x)}>{x}</button>
              ))}
              <a href="/Resume_Neti.pdf" download className="drawer-resume">Download Resume</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="about" className="hero">
        <div className="glow one" />
        <div className="glow two" />
        <div className="glow three" />

        <motion.div
          className="hero-text"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={reveal} className="badge">
            <span className="badge-dot" />Open to DevOps &amp; Cloud opportunities
          </motion.span>

          <motion.p variants={reveal} className="hero-greeting">Hello, I'm</motion.p>

          <motion.h1 variants={reveal}>
            Neti <em>Sharma.</em>
          </motion.h1>

          <motion.h2 variants={reveal} className="hero-sub">
            Senior Engineer building reliable cloud platforms,
            automated delivery pipelines and scalable test systems.
          </motion.h2>

          <motion.p variants={reveal} className="hero-lead">
            I turn complex infrastructure challenges into secure, repeatable and
            observable workflows — with <strong>AWS</strong>, <strong>Kubernetes</strong>,{' '}
            <strong>Terraform</strong>, <strong>CI/CD</strong> and <strong>Python</strong>.
          </motion.p>

          <motion.div variants={reveal} className="hero-actions">
            <button className="btn-primary" onClick={() => go('Projects')}>
              Explore my work <ArrowDown size={16} />
            </button>
            <button className="btn-outline" onClick={() => go('Contact')}>
              Contact me <ArrowUpRight size={16} />
            </button>
          </motion.div>

          <motion.div variants={reveal} className="social">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="mailto:sharmaneti22@example.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Terminal card */}
        <motion.div
          className="terminal"
          initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="term-bar">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="term-title">neti@devops ~ zsh</span>
          </div>
          <div className="term-body">
            <p><span className="prompt">❯</span> <span className="cmd">whoami</span></p>
            <p className="out">Senior DevOps &amp; Cloud Engineer @ Qualcomm</p>
            <p><span className="prompt">❯</span> <span className="cmd">cat stack.txt</span></p>
            <p className="out">AWS · EKS · Terraform</p>
            <p className="out">Jenkins · GitLab CI/CD · Argo CD</p>
            <p className="out">Python · Docker · Helm</p>
            <p><span className="prompt">❯</span> <span className="cmd">cat impact.txt</span></p>
            <p className="out">30% faster test execution</p>
            <p className="out">90% less manual analysis</p>
            <p className="out">4+ years shipping infra</p>
            <p><span className="prompt blink">❯</span> <span className="cursor">▋</span></p>
          </div>
        </motion.div>

        <ScrollHint />
      </section>

      {/* ── STATS STRIP ── */}
      <section className="stats-strip">
        {STATS.map((s, i) => <StatCard key={i} {...s} />)}
      </section>

      {/* ── ABOUT BLURB ── */}
      <section id="about-detail" className="about-section">
        <motion.div
          className="about-inner"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={reveal} className="about-text">
            <small className="eyebrow">WHO I AM</small>
            <h2>Engineering calm into complex systems.</h2>
            <p>
              I'm a Senior Engineer at <strong>Qualcomm</strong> focused on DevOps, cloud infrastructure
              and RF test automation. With 4+ years of hands-on experience I've built platforms that
              keep production boring — in the best way.
            </p>
            <p>
              My philosophy: <em>the best infrastructure is the kind nobody notices.</em> Build systems
              that heal themselves and you spend less time firefighting, more time shipping.
            </p>
            <p>
              Off the clock you'll find me exploring distributed systems papers, tinkering with
              home-lab Kubernetes clusters, or hiking — because a clear mind makes for better debugging.
            </p>
          </motion.div>

          <motion.div variants={reveal} className="about-cards">
            {[
              { icon: Cloud, title: 'Cloud Platforms', desc: 'AWS-first, multi-cloud aware. Secure, scalable and cost-conscious.' },
              { icon: Zap, title: 'Delivery Automation', desc: 'CI/CD pipelines that turn commits into production in minutes.' },
              { icon: ServerCog, title: 'Platform Reliability', desc: 'Observability, self-healing and runbooks that actually work.' },
              { icon: Code2, title: 'Engineering Automation', desc: 'Python and Bash scripts that eliminate toil at scale.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="about-card"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Icon size={22} />
                <h4>{title}</h4>
                <p>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <SectionHeading
          eyebrow="TECHNICAL TOOLKIT"
          copy="A practical stack focused on automation, reliability and repeatable delivery."
        >
          Built for modern infrastructure.
        </SectionHeading>

        <div className="skill-categories">
          {SKILL_CATEGORIES.map(({ label, icon: Icon, items }, ci) => (
            <motion.div
              key={ci}
              className="skill-cat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.07 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="skill-cat-header">
                <Icon size={20} />
                <h4>{label}</h4>
              </div>
              <ul>
                {items.map((item, ii) => (
                  <li key={ii}><ChevronRight size={13} />{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <SectionHeading eyebrow="CAREER JOURNEY">Experience that ships.</SectionHeading>

        {/* git-log style header */}
        <div className="git-meta">
          <Terminal size={14} />
          <code>git log --oneline --graph</code>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              className="tl-item"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="tl-connector">
                <span className="tl-hash">{exp.hash}</span>
                <div className="tl-line" />
              </div>
              <div className="tl-card">
                <div className="tl-card-top">
                  <span className="tl-tag">{exp.tag}</span>
                  <span className="tl-period">{exp.period}</span>
                  <span className="tl-duration">{exp.duration}</span>
                </div>
                <h3>{exp.role}</h3>
                <div className="tl-company">
                  <strong>{exp.company}</strong>
                  <span>{exp.location}</span>
                </div>
                <ul className="tl-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi}><span className="plus">+</span>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div className="edu-heading">
          <BookOpen size={16} />
          <span>Education</span>
        </div>

        <div className="edu-list">
          {[
            {
              degree: 'M.Tech in Electronics & Communication Engineering',
              school: 'Malaviya National Institute of Technology',
              location: 'Jaipur, India',
              period: 'Aug 2020 – Aug 2022',
            },
            {
              degree: 'B.Tech in Electronics & Communication Engineering',
              school: 'Government Engineering College Bikaner',
              location: 'Bikaner, India',
              period: 'Aug 2012 – Aug 2016',
            },
          ].map((edu, i) => (
            <motion.div
              key={i}
              className="edu-card"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="edu-card-left">
                <BookOpen size={20} />
              </div>
              <div className="edu-card-body">
                <div className="edu-card-top">
                  <span className="edu-period">{edu.period}</span>
                  <span className="edu-location">{edu.location}</span>
                </div>
                <h4>{edu.degree}</h4>
                <p>{edu.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <SectionHeading
          eyebrow="SELECTED WORK"
          copy="Automation, cloud, GitOps and distributed-system work with measurable outcomes."
        >
          Projects with impact.
        </SectionHeading>

        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              className="proj-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`proj-cover ${p.gradient}`}>
                <span className="proj-tag">{p.tag}</span>
                <ArrowUpRight size={22} className="proj-arrow" />
                <strong className="proj-num">0{i + 1}</strong>
              </div>
              <div className="proj-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="proj-outcome">
                  <span>✓</span> {p.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications">
        <SectionHeading eyebrow="CREDENTIALS">Certifications &amp; learning.</SectionHeading>

        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <motion.div
              key={i}
              className={`cert-card ${c.status}`}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="cert-top">
                <c.icon size={20} />
                <span className={`cert-badge ${c.status}`}>
                  {c.status === 'earned' ? 'Earned' : 'In Preparation'}
                </span>
              </div>
              <h4>{c.title}</h4>
              <p className="cert-issuer">{c.issuer}</p>
              {c.note && <p className="cert-note">{c.note}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <motion.div
          className="contact-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — heading + blurb */}
          <div className="contact-left">
            <h2>Let's talk</h2>
            <p>
              Whether it's a role, a project or just a good DevOps conversation —
              I'd love to hear from you.
            </p>
            <div className="contact-meta">
              <span><MapPin size={13} /> Jaipur, Rajasthan — India</span>
              <span className="contact-open-badge">
                <span className="badge-dot" /> Open to Remote
              </span>
            </div>
          </div>

          {/* Right — dark card */}
          <div className="contact-card">
            <div className="contact-glow" />

            {/* SSH-style header */}
            <div className="contact-ssh">
              <span className="ssh-prompt">$</span>
              <span className="ssh-cmd">ssh <span className="ssh-user">neti</span> @sharma.dev</span>
            </div>

            <p className="contact-card-desc">
              I'm always up for a good conversation about DevOps, cloud infrastructure
              or RF automation. <strong>Email or WhatsApp</strong> is the fastest way
              to reach me — I usually respond within a day.
            </p>

            {/* Contact link rows */}
            <div className="contact-links">
              {[
                {
                  icon: Mail,
                  label: 'EMAIL',
                  value: 'sharmaneti22@gmail.com',
                  href: 'mailto:sharmaneti22@gmail.com',
                  color: 'cl-purple',
                },
                {
                  icon: Phone,
                  label: 'WHATSAPP',
                  value: '+91 9461159501',
                  href: 'https://wa.me/919461159501',
                  color: 'cl-green',
                },
                {
                  icon: LinkedinIcon,
                  label: 'LINKEDIN',
                  value: '/in/neti-dsnk4321',
                  href: 'https://linkedin.com/in/neti-dsnk4321',
                  color: 'cl-blue',
                },
                {
                  icon: Phone,
                  label: 'PHONE',
                  value: '+91 6378317975',
                  href: 'tel:+916378317975',
                  color: 'cl-cyan',
                },
              ].map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="contact-link-row"
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                >
                  <span className={`cl-icon ${color}`}>
                    <Icon size={16} />
                  </span>
                  <span className="cl-body">
                    <span className="cl-label">{label}</span>
                    <span className="cl-value">{value}</span>
                  </span>
                  <ArrowUpRight size={15} className="cl-arrow" />
                </motion.a>
              ))}
            </div>

            <div className="contact-card-footer">
              <a href="/Resume_Neti.pdf" download className="btn-primary contact-resume-btn">
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer>
        <span>© 2026 Neti Sharma</span>
        <span className="footer-sep">·</span>
        <span>Built with React &amp; Framer Motion</span>
        <span className="footer-sep">·</span>
        <a href="mailto:sharmaneti22@gmail.com">sharmaneti22@gmail.com</a>
      </footer>

    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
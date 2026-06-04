"use client";

import { useEffect, useRef, useState } from "react";


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const skills = {
    "Backend & Database": [
      "Python (Advanced)", "Django Framework", "RESTful APIs",
      "MySQL", "Prisma", "Database Design", "ORM",
    ],
    "Frontend & UI": [
      "TypeScript", "Next.js", "HTML5 / CSS3",
      "JavaScript (ES6+)", "HTMX", "Tailwind CSS",
      "Responsive Design", "Bootstrap",
    ],
    "DevOps & Tools": [
      "Git / GitHub", "VS Code", "Postman (API Test)",
    ],
    "Basic Understanding": [
      "C / C++", "Java", "Figma (UI Design)", "Algorithm Logic",
    ],
  };

  const projects = [
    {
      num: "01",
      title: "EasyParking",
      tags: ["Python", "Django", "OpenCV", "YOLOv5", "MySQL"],
      desc: "Smart parking web application using Django for the backend. Implemented YOLOv5 for vehicle detection and OpenCV for real-time video processing with detection overlays.",
      status: "Completed",
    },
    {
      num: "02",
      title: "Warehouse System",
      tags: ["TypeScript", "Next.js", "Prisma"],
      desc: "Warehouse management system built with TypeScript, featuring inventory tracking, order management, and a clean dashboard interface.",
      status: "In Progress",
    },
  ];

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .portfolio-root {
          --bg: #080b14;
          --bg2: #0d1120;
          --bg3: #111827;
          --accent: #6ee7b7;
          --accent2: #38bdf8;
          --muted: #4b5563;
          --text: #f1f5f9;
          --text2: #94a3b8;
          --border: rgba(255,255,255,0.07);
          --font: 'Syne', sans-serif;
          --mono: 'DM Mono', monospace;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 3rem;
          transition: background 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          background: rgba(8,11,20,0.92);
          backdrop-filter: blur(12px);
          border-color: var(--border);
        }
        .nav-logo {
          font-size: 1.1rem; font-weight: 700; letter-spacing: 0.08em;
          color: var(--accent); font-family: var(--mono);
          cursor: pointer;
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font); font-size: 0.85rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text2); transition: color 0.2s;
          padding: 0;
        }
        .nav-links button:hover,
        .nav-links button.active { color: var(--accent); }
        .nav-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          color: var(--text); padding: 4px;
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--bg); z-index: 99;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 2.5rem;
          transition: opacity 0.3s, transform 0.3s;
        }
        .mobile-menu.closed { opacity: 0; pointer-events: none; transform: translateY(-10px); }
        .mobile-menu button {
          background: none; border: none; cursor: pointer; font-family: var(--font);
          font-size: 1.8rem; font-weight: 700; color: var(--text2); letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: var(--accent); }

        /* SECTIONS */
        section { padding: 7rem 3rem; max-width: 1100px; margin: 0 auto; }

        /* HERO */
        #hero {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; padding-top: 6rem; position: relative;
        }
        .hero-eyebrow {
          font-family: var(--mono); font-size: 0.8rem; color: var(--accent);
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 2.5rem; height: 1px; background: var(--accent);
        }
        .hero-name {
          font-size: clamp(3.5rem, 8vw, 7rem); font-weight: 800;
          line-height: 0.95; letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .hero-name span { color: var(--accent); }
        .hero-tagline {
          font-size: clamp(1rem, 2vw, 1.3rem); color: var(--text2);
          max-width: 540px; line-height: 1.7; margin-bottom: 3rem;
          font-weight: 400;
        }
        .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          padding: 0.75rem 2rem; background: var(--accent); color: #080b14;
          border: none; border-radius: 4px; font-family: var(--font);
          font-weight: 700; font-size: 0.9rem; letter-spacing: 0.05em;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          text-transform: uppercase;
        }
        .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-outline {
          padding: 0.75rem 2rem; background: transparent; color: var(--text);
          border: 1px solid var(--border); border-radius: 4px; font-family: var(--font);
          font-weight: 600; font-size: 0.9rem; letter-spacing: 0.05em;
          cursor: pointer; transition: border-color 0.2s, color 0.2s, transform 0.15s;
          text-transform: uppercase;
        }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
        .hero-scroll {
          position: absolute; bottom: 3rem; left: 3rem;
          display: flex; align-items: center; gap: 0.75rem;
          font-family: var(--mono); font-size: 0.7rem; color: var(--muted);
          letter-spacing: 0.15em; text-transform: uppercase;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .hero-scroll::after {
          content: ''; display: block; width: 1px; height: 3rem; background: var(--muted);
        }

        /* SECTION HEADER */
        .sec-header {
          display: flex; align-items: center; gap: 1.5rem;
          margin-bottom: 4rem;
        }
        .sec-num {
          font-family: var(--mono); font-size: 0.75rem; color: var(--accent);
          letter-spacing: 0.15em;
        }
        .sec-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800;
          letter-spacing: -0.02em;
        }
        .sec-line {
          flex: 1; height: 1px; background: var(--border);
        }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .about-text p {
          color: var(--text2); line-height: 1.85; font-size: 1.05rem;
          margin-bottom: 1.2rem;
        }
        .about-text p strong { color: var(--text); }
        .about-facts { display: flex; flex-direction: column; gap: 1.5rem; }
        .fact-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 8px; padding: 1.5rem;
          border-left: 3px solid var(--accent);
        }
        .fact-label {
          font-family: var(--mono); font-size: 0.7rem; color: var(--accent);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.4rem;
        }
        .fact-value { font-size: 1rem; font-weight: 600; color: var(--text); }
        .fact-sub { font-size: 0.85rem; color: var(--text2); margin-top: 0.2rem; }

        /* EXPERIENCE */
        .exp-item {
          display: grid; grid-template-columns: 160px 1fr;
          gap: 0 3rem; padding: 2.5rem 0;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .exp-item:last-child { border-bottom: none; }
        .exp-period {
          font-family: var(--mono); font-size: 0.8rem;
          color: var(--muted); padding-top: 0.25rem;
          line-height: 1.6;
        }
        .exp-role { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.3rem; }
        .exp-company { color: var(--accent); font-weight: 600; margin-bottom: 0.75rem; }
        .exp-desc { color: var(--text2); line-height: 1.7; font-size: 0.95rem; }

        /* PROJECTS */
        .projects-grid { display: flex; flex-direction: column; gap: 1.5rem; }
        .project-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 2rem 2.5rem;
          display: grid; grid-template-columns: 60px 1fr;
          gap: 0 2rem; align-items: start;
          transition: border-color 0.25s, transform 0.2s;
          cursor: default;
        }
        .project-card:hover {
          border-color: rgba(110,231,183,0.3);
          transform: translateY(-2px);
        }
        .proj-num {
          font-family: var(--mono); font-size: 2rem; font-weight: 300;
          color: var(--muted); line-height: 1; padding-top: 0.2rem;
        }
        .proj-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; }
        .proj-desc { color: var(--text2); line-height: 1.7; font-size: 0.95rem; margin-bottom: 1rem; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .tag {
          font-family: var(--mono); font-size: 0.7rem;
          padding: 0.25rem 0.7rem; border-radius: 4px;
          background: rgba(110,231,183,0.08); color: var(--accent);
          border: 1px solid rgba(110,231,183,0.15); letter-spacing: 0.05em;
        }
        .proj-status {
          font-family: var(--mono); font-size: 0.7rem;
          padding: 0.2rem 0.65rem; border-radius: 20px;
          display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .proj-status.done {
          background: rgba(110,231,183,0.1); color: var(--accent);
          border: 1px solid rgba(110,231,183,0.2);
        }
        .proj-status.wip {
          background: rgba(56,189,248,0.1); color: var(--accent2);
          border: 1px solid rgba(56,189,248,0.2);
        }
        .proj-status::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor;
        }

        /* SKILLS */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .skill-group {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 1.75rem;
        }
        .skill-group-title {
          font-family: var(--mono); font-size: 0.72rem; color: var(--accent2);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.25rem;
          padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
        }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-pill {
          font-size: 0.82rem; padding: 0.35rem 0.85rem;
          border-radius: 4px; background: var(--bg3);
          border: 1px solid var(--border); color: var(--text2);
          transition: color 0.2s, border-color 0.2s;
        }
        .skill-pill:hover { color: var(--text); border-color: rgba(255,255,255,0.15); }

        /* CONTACT */
        .contact-inner {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
        }
        .contact-text h3 { font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem; }
        .contact-text p { color: var(--text2); line-height: 1.7; }
        .contact-links { display: flex; flex-direction: column; gap: 1rem; }
        .contact-link {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem 1.5rem; background: var(--bg2);
          border: 1px solid var(--border); border-radius: 8px;
          text-decoration: none; color: var(--text);
          transition: border-color 0.2s, transform 0.15s;
        }
        .contact-link:hover { border-color: rgba(110,231,183,0.3); transform: translateX(4px); }
        .contact-link-icon {
          width: 40px; height: 40px; border-radius: 8px;
          background: rgba(110,231,183,0.08); border: 1px solid rgba(110,231,183,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .contact-link-info { flex: 1; }
        .contact-link-label {
          font-family: var(--mono); font-size: 0.7rem; color: var(--muted);
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .contact-link-value { font-size: 0.95rem; font-weight: 600; margin-top: 0.15rem; }

        /* FOOTER */
        footer {
          text-align: center; padding: 2.5rem 3rem;
          border-top: 1px solid var(--border);
          font-family: var(--mono); font-size: 0.75rem;
          color: var(--muted); letter-spacing: 0.1em;
        }

        /* GRID BG */
        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 80%);
        }
        .page-content { position: relative; z-index: 1; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
          section { padding: 5rem 1.5rem; }
          .about-grid,
          .contact-inner,
          .skills-grid { grid-template-columns: 1fr; gap: 2rem; }
          .exp-item { grid-template-columns: 1fr; gap: 0.5rem; }
          .hero-scroll { left: 1.5rem; }
          .project-card { grid-template-columns: 1fr; }
          .proj-num { display: none; }
        }
      `}</style>

      <div className="grid-bg" />

      {/* NAV */}
      <nav className={`nav${scrollY > 50 ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("hero")}>kengkla</div>
        <ul className="nav-links">
          {navItems.map((n) => (
            <li key={n.id}>
              <button
                className={activeSection === n.id ? "active" : ""}
                onClick={() => scrollTo(n.id)}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? "" : " closed"}`}>
        {navItems.map((n) => (
          <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
        ))}
      </div>

      <div className="page-content">
        {/* HERO */}
        <section id="hero">
          <div className="hero-eyebrow">Available for opportunities</div>
          <h1 className="hero-name">
            Kengkla<br /><span>Arwan.</span>
          </h1>
          <p className="hero-tagline">
            Data Science & Software Innovation student passionate about building
            clean, efficient software — from backend systems to modern web interfaces.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>
          <div className="hero-scroll">Scroll</div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="sec-header">
            <span className="sec-num">01</span>
            <h2 className="sec-title">About</h2>
            <div className="sec-line" />
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I&apos;m <strong>Kengkla Arwan</strong>, a Data Science & Software Innovation
                student at Ubon Ratchathani University with a passion for software development
                and software engineering.
              </p>
              <p>
                I enjoy building things end-to-end — from designing solid backend
                architectures and databases to crafting clean, responsive frontends.
                I love solving real-world problems through code.
              </p>
              <p>
                I also have a growing interest in <strong>Artificial Intelligence</strong> —
                from understanding core ML concepts and working with models like YOLOv5,
                to prompt engineering and exploring how AI tools can enhance the way we build software.
                I&apos;m not an expert yet, but I&apos;m actively learning and excited about where this space is heading.
              </p>
              <p>
                Currently expanding my skills in <strong>TypeScript, Next.js</strong>, and
                exploring how modern tooling can make development faster and more reliable.
              </p>
            </div>
            <div className="about-facts">
              <div className="fact-card">
                <div className="fact-label">University</div>
                <div className="fact-value">Ubon Ratchathani University</div>
                <div className="fact-sub">Data Science & Software Innovation</div>
              </div>
              <div className="fact-card">
                <div className="fact-label">Focus</div>
                <div className="fact-value">Software Development & Software Engineering</div>
                <div className="fact-sub">Backend · Frontend · Database</div>
              </div>
              <div className="fact-card">
                <div className="fact-label">Location</div>
                <div className="fact-value">Bangkok, Thailand</div>
                <div className="fact-sub">Open to remote & relocation</div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="sec-header">
            <span className="sec-num">02</span>
            <h2 className="sec-title">Experience</h2>
            <div className="sec-line" />
          </div>
          <div className="exp-item">
            <div className="exp-period">2023 — 2025</div>
            <div>
              <div className="exp-role">Student Developer</div>
              <div className="exp-company">Ubon Ratchathani University</div>
              <div className="exp-desc">
                Built academic and personal projects spanning the full stack — backend APIs with Django,
                computer vision pipelines with OpenCV & YOLOv5, and modern web interfaces with Next.js
                and TypeScript. Also explored Flutter with AI API integration.
              </div>
              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                {["Python", "Django", "MySQL", "OpenCV", "YOLOv5"].map(t => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="exp-item">
              <div className="exp-period">Dec 2025 —<br />Apr 2026</div>
              <div>
                <div className="exp-role">Software Engineer Intern</div>
                <div className="exp-company">Polyfoam Manufacturing Limited</div>
                <div className="exp-desc">
                  Developed, tested, and deployed internal web systems used in production across the company.
                  Handled the full delivery cycle independently — from requirements through deployment on Linux servers.
                </div>
                <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                  {["TypeScript", "Next.js", "MySQL", "PostgreSQL", "Prisma", "Line API", "Linux"].map(t => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="sec-header">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Projects</h2>
            <div className="sec-line" />
          </div>
          <div className="projects-grid">
            {[
              {
                num: "01",
                title: "Helpdesk System",
                status: "Completed · Internship",
                statusClass: "done",
                tags: ["TypeScript", "Next.js", "MySQL", "PostgreSQL", "Prisma", "Line API", "Linux"],
                desc: "Internal helpdesk web app for employees to submit support requests. Integrated with LINE so users can fill in forms directly from the LINE app without opening a browser. Deployed to production on a Linux server with PostgreSQL.",
              },
              {
                num: "02",
                title: "Warehouse Management System",
                status: "Completed · Internship",
                statusClass: "done",
                tags: ["TypeScript", "Next.js", "Prisma", "Chart.js", "Linux"],
                desc: "Full inventory management system with deposit & withdrawal tracking, an overview dashboard with bar and donut charts, transaction history, and a rule-based AI recommendation engine that suggests items needing restocking based on current stock levels. Deployed to production on Linux.",
              },
              {
                num: "03",
                title: "EasyParking",
                status: "Completed",
                statusClass: "done",
                tags: ["Python", "Django", "OpenCV", "YOLOv5", "MySQL"],
                desc: "Smart parking web application using Django for the backend. Implemented YOLOv5 for real-time vehicle detection and OpenCV for video processing with detection overlays.",
              },
            ].map((p) => (
              <div className="project-card" key={p.num}>
                <div className="proj-num">{p.num}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" as const }}>
                    <div className="proj-title" style={{ margin: 0 }}>{p.title}</div>
                    <span className={`proj-status ${p.statusClass}`}>{p.status}</span>
                  </div>
                  <div className="proj-tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="proj-desc">{p.desc}</div>
                </div>
              </div>
            ))}
            <div className="project-card" style={{ borderStyle: "dashed", opacity: 0.45 }}>
              <div className="proj-num">04</div>
              <div>
                <div className="proj-title" style={{ color: "var(--muted)" }}>More coming soon...</div>
                <div className="proj-desc">Next project is in the works. Check back later.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="sec-header">
            <span className="sec-num">04</span>
            <h2 className="sec-title">Skills</h2>
            <div className="sec-line" />
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items]) => (
              <div className="skill-group" key={group}>
                <div className="skill-group-title">{group}</div>
                <div className="skill-pills">
                  {items.map((s) => <span className="skill-pill" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        

        {/* CONTACT */}
        <section id="contact">
          <div className="sec-header">
            <span className="sec-num">05</span>
            <h2 className="sec-title">Contact</h2>
            <div className="sec-line" />
          </div>
          <div className="contact-inner">
            <div className="contact-text">
              <h3>Let&apos;s build<br />something together.</h3>
              <p>
                I recently completed my internship and I&apos;m now looking for a full-time opportunity
                as a Software Engineer. Open to collaborations too, or just a good conversation about tech.
                Feel free to reach out!
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:kengkla48@gmail.com" className="contact-link">
                <div className="contact-link-icon">✉</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">kengkla48@gmail.com</div>
                </div>
              </a>
              <a href="https://github.com/kengkla77" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">⌥</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">github.com/kengkla77</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/kengkla-arwan-49b05a387/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">in</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">linkedin.com/in/kengkla-arwan</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <footer>
          © 2026 Kengkla Arwan · Built with Next.js & Tailwind CSS · Deployed on Vercel
        </footer>
      </div>
    </div>
  );
}
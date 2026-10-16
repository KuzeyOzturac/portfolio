import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatedSelection } from "./components/AnimatedSelection";
import { Icon } from "./components/Icon";
import { awards, experiences, projects, skills, type Project } from "./data";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-500.css";
import "@fontsource/cinzel/latin-600.css";
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "./styles.css";
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const spring = { type: "spring" as const, stiffness: 160, damping: 25 };
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}
function Ornament() {
  return (
    <span className="ornament" aria-hidden="true">
      <span />◇<span />
    </span>
  );
}
function Sketch({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-sketch ${project.color} ${large ? "large" : ""}`}
      aria-label={`${project.name} workflow illustration`}
      role="img"
    >
      <div className="sketch-grid" />
      <span className="sketch-note">
        {project.id === "asl"
          ? "Vision & inference"
          : project.id === "eco"
            ? "Retrieval & reasoning"
            : project.category}
      </span>
      <div className="sketch-orbit">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit-cross horizontal" />
        <span className="orbit-cross vertical" />
        <div className="heraldic-shield">
          <Icon name={project.icon} />
        </div>
        <span className="orbit-node node-one" />
        <span className="orbit-node node-two" />
        <span className="orbit-node node-three" />
      </div>
      <div className="sketch-steps">
        {project.sketch.map((x, i) => (
          <React.Fragment key={x}>
            <span>{x}</span>
            {i < 3 && <Icon name="chevron" />}
          </React.Fragment>
        ))}
      </div>
      <span className="sketch-caption">
        SYSTEM SKETCH <span>0{projects.indexOf(project) + 1}</span>
      </span>
    </div>
  );
}
function ProjectCard({
  project,
  index,
  highlighted,
}: {
  project: Project;
  index: number;
  highlighted: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <motion.article
        layout
        layoutId={reduced ? undefined : `dossier-${project.id}`}
        className={`project-card ${highlighted ? "is-relevant" : ""}`}
        transition={spring}
      >
        <div className="card-topline">
          <span>
            0{index + 1} <i /> {project.category}
          </span>
          <Icon name={project.icon} />
        </div>
        <Dialog.Trigger asChild>
          <motion.button
            className="project-open"
            whileTap={reduced ? {} : { scale: 0.99 }}
            aria-label={`Open ${project.name} dossier`}
          >
            <Sketch project={project} />
            <div className="project-summary">
              <span className="eyebrow">Project holding</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="card-bottom">
                <span>{project.tools}</span>
                <span className="round-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
            </div>
          </motion.button>
        </Dialog.Trigger>
        <div className="card-direct">
          <span>
            {project.metric} <small>{project.metricLabel}</small>
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} repository on GitHub`}
          >
            <Icon name="github" />
            <span>Source</span>
            <Icon name="arrow" />
          </a>
        </div>
      </motion.article>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                layoutId={reduced ? undefined : `dossier-${project.id}`}
                className="dossier"
                initial={
                  reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }
                }
                transition={spring}
              >
                <div className="dossier-scroll">
                  <div className="dossier-top">
                    <span className="eyebrow">
                      The portfolio / project dossier 0{index + 1}
                    </span>
                    <Dialog.Close
                      className="icon-button"
                      aria-label="Close project dossier"
                    >
                      <Icon name="close" />
                    </Dialog.Close>
                  </div>
                  <Dialog.Title className="dossier-title">
                    {project.name}
                  </Dialog.Title>
                  <Dialog.Description className="dossier-description">
                    {project.description}
                  </Dialog.Description>
                  <Sketch project={project} large />
                  <div className="dossier-body">
                    <div className="dossier-fact">
                      <Icon name={project.icon} />
                      <div>
                        <strong>{project.metric}</strong>
                        <span>{project.metricLabel}</span>
                      </div>
                    </div>
                    <h3>My contribution</h3>
                    {project.details.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <h3>Tools & technologies</h3>
                    <p className="tool-line">{project.tools}</p>
                    <a
                      className="button primary"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="github" /> View repository{" "}
                      <Icon name="arrow" />
                    </a>
                  </div>
                  <div className="dossier-foot">
                    The work behind the record.<span>K / O</span>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
function Portrait() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [playing, reduced]);
  return (
    <div className="portrait-frame">
      <div className="portrait-inner">
        <img
          className="portrait"
          src={asset("kuzey-suit-idle.webp")}
          alt="Kuzey Ozturac wearing a black suit in a stone hall"
          width="749"
          height="1000"
          fetchPriority="high"
        />
        {!reduced && (
          <video
            ref={video}
            className="portrait portrait-video"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={asset("kuzey-suit-idle.webp")}
            aria-hidden="true"
          >
            <source src={asset("kuzey-idle-loop.webm")} type="video/webm" />
          </video>
        )}
        <div className="portrait-shade" />
        <span className="portrait-index">
          CHARACTER RECORD <i /> 001
        </span>
        <div className="portrait-stamp">
          <Icon name="crown" />
        </div>
        <div className="portrait-name">
          <span>University of Toronto</span>
          <p>
            Computer Science
            <br />
            <em>with an AI focus.</em>
          </p>
        </div>
        {!reduced && (
          <button
            className="portrait-toggle icon-button"
            onClick={() => setPlaying(!playing)}
            aria-label={
              playing ? "Pause portrait animation" : "Play portrait animation"
            }
          >
            <Icon name={playing ? "pause" : "play"} />
          </button>
        )}
      </div>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
    </div>
  );
}
function Education() {
  return (
    <div className="education-record">
      <div className="record-heading">
        <Icon name="graduation" />
        <span>Education</span>
      </div>
      <h3>University of Toronto</h3>
      <p>
        Honours Bachelor of Science
        <br />
        with Distinction <span className="gold">· 2026</span>
      </p>
      <p className="education-small">
        Computer Science Specialist · AI Focus
        <br />
        Dean’s List Scholar · 2023–2024
      </p>
    </div>
  );
}
function Languages() {
  return (
    <div className="languages">
      <div className="record-heading">
        <Icon name="globe" />
        <span>Languages</span>
      </div>
      <dl>
        {[
          ["English", "Fluent"],
          ["Turkish", "Fluent"],
          ["German", "Intermediate"],
          ["French", "Beginner"],
        ].map(([name, level]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>
              <span
                className={`language-mark ${level.toLowerCase()}`}
                aria-hidden="true"
              >
                {level === "Fluent"
                  ? "◆◆"
                  : level === "Intermediate"
                    ? "◆◇"
                    : "◇◇"}
              </span>
              <span>{level}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
function App() {
  const [activeSection, setActiveSection] = useState("character");
  const [record, setRecord] = useState("projects");
  const [skill, setSkill] = useState<string | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    ["character", "traits", "holdings", "contact"].forEach((id) => {
      const e = document.getElementById(id);
      if (e) io.observe(e);
    });
    return () => io.disconnect();
  }, []);
  const nav = [
    ["character", "crown", "Character"],
    ["traits", "brain", "Skills"],
    ["holdings", "shield", "Portfolio"],
    ["contact", "mail", "Contact"],
  ];
  const goWork = () => {
    setRecord("projects");
    document
      .getElementById("holdings")
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };
  return (
    <MotionConfig reducedMotion="user" transition={spring}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LayoutGroup>
        <aside className="side-rail">
          <a
            href="#character"
            className="monogram"
            aria-label="Kuzey Ozturac — back to character"
          >
            K<span>O</span>
          </a>
          <nav aria-label="Main navigation">
            {nav.map(([id, icon, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                aria-label={label}
              >
                {activeSection === id && <AnimatedSelection id="rail-active" />}
                <Icon name={icon} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <span className="rail-year">MMXXVI</span>
        </aside>
        <div className="page-shell">
          <header className="topbar">
            <a href="#character">
              Kuzey Ozturac <span>/ Portfolio</span>
            </a>
            <span className="availability">
              <i /> Open to opportunities
            </span>
            <a className="top-contact" href="mailto:kuzeyozturac2@gmail.com">
              Get in touch <Icon name="arrow" />
            </a>
          </header>
          <main id="main">
            <section id="character" className="character-section">
              <div className="section-prelude">
                <span>The character record</span>
                <span>Software · Artificial intelligence · Data</span>
              </div>
              <div className="hero">
                <Reveal className="hero-portrait">
                  <Portrait />
                </Reveal>
                <div className="hero-content">
                  <Reveal>
                    <div className="hero-status">
                      <span className="mini-shield">
                        <Icon name="shield" />
                      </span>
                      <span>
                        A builder, by profession.
                        <br />
                        <em>A curious mind, by nature.</em>
                      </span>
                    </div>
                    <h1>
                      Kuzey
                      <br />
                      <span>Ozturac</span>
                      <span className="name-ornament" aria-hidden="true">
                        ✧
                      </span>
                    </h1>
                    <p className="hero-subtitle">
                      Software, AI <em>&</em> data.
                    </p>
                    <div className="hero-intro">
                      <p>
                        I’m Kuzey Ozturac, a University of Toronto Computer
                        Science graduate with an AI focus. I build machine
                        learning systems, data-driven applications, and software
                        that turns technical ideas into useful products.
                      </p>
                    </div>
                    <div className="hero-actions">
                      <motion.button
                        className="button primary"
                        onClick={goWork}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore my work <Icon name="down" />
                      </motion.button>
                      <a
                        className="text-link"
                        href="https://github.com/KuzeyOzturac"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="github" /> GitHub <Icon name="arrow" />
                      </a>
                      <a
                        className="text-link"
                        href="https://www.linkedin.com/in/kuzey-ozturac-077683266"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="linkedin" /> LinkedIn <Icon name="arrow" />
                      </a>
                    </div>
                  </Reveal>
                  <Reveal delay={0.12} className="hero-records">
                    <Education />
                    <Languages />
                  </Reveal>
                </div>
              </div>
              <Reveal className="about-line">
                <Icon name="book" />
                <p>
                  At Kale Endüstri Holding, I developed a Python computer vision
                  and OCR pipeline for receipt processing and built a travel and
                  expense application. At Cencora, I built Qlik Sense reports
                  and gathered requirements across seven pharmacies.
                </p>
                <span className="about-signature">K. Ozturac</span>
              </Reveal>
            </section>
            <section id="traits" className="traits-section">
              <Reveal className="section-title">
                <div>
                  <span className="eyebrow">01 / The skill set</span>
                  <h2>
                    Traits & expertise<span>.</span>
                  </h2>
                </div>
                <p>
                  Select a trait to discover
                  <br />
                  where it appears in my work.
                </p>
              </Reveal>
              <div className="trait-grid">
                {skills.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.04}>
                    <motion.button
                      aria-pressed={skill === s.id}
                      className={`trait ${skill === s.id ? "selected" : ""}`}
                      onClick={() => setSkill(skill === s.id ? null : s.id)}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="trait-top">
                        <span className="trait-icon">
                          <Icon name={s.icon} />
                        </span>
                        <span className="trait-number">0{i + 1}</span>
                      </div>
                      <h3>{s.name}</h3>
                      <p className="trait-subtitle">{s.subtitle}</p>
                      <p className="trait-items">{s.items.join(" · ")}</p>
                      <span className="trait-footer">
                        {skill === s.id
                          ? "Selected trait"
                          : "Discover connections"}
                        <Icon name={skill === s.id ? "check" : "arrow"} />
                      </span>
                    </motion.button>
                  </Reveal>
                ))}
              </div>
              <div className="trait-context" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={skill || "default"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    <Icon name="sparkles" />
                    {skill
                      ? skills.find((s) => s.id === skill)?.evidence
                      : "Experience shapes the skills. The projects below show them in practice."}
                    {skill && (
                      <button onClick={goWork}>
                        See related work <Icon name="down" />
                      </button>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
            </section>
            <section id="holdings" className="holdings-section">
              <Reveal className="section-title">
                <div>
                  <span className="eyebrow">02 / The portfolio</span>
                  <h2>
                    Work, with substance<span>.</span>
                  </h2>
                </div>
                <Ornament />
              </Reveal>
              <Tabs.Root
                value={record}
                onValueChange={setRecord}
                className="portfolio-tabs"
              >
                <Tabs.List
                  aria-label="Portfolio records"
                  className="record-tabs"
                >
                  {[
                    ["projects", "shield", "Projects", "05"],
                    ["experience", "book", "Experience", "03"],
                    ["awards", "medal", "Awards", "03"],
                  ].map(([id, icon, label, n]) => (
                    <Tabs.Trigger key={id} value={id}>
                      {record === id && (
                        <AnimatedSelection id="record-active" />
                      )}
                      <Icon name={icon} />
                      <span>{label}</span>
                      <small>{n}</small>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={record}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {record === "projects" && (
                      <Tabs.Content value="projects" forceMount>
                        <div className="portfolio-intro">
                          <p>A selection of things I’ve helped build.</p>
                          <span>
                            {skill
                              ? "Related work marked in gold"
                              : "Select a holding to open its dossier"}
                            <Icon name="arrow" />
                          </span>
                        </div>
                        <div className="project-grid">
                          {projects.map((p, i) => (
                            <ProjectCard
                              key={p.id}
                              project={p}
                              index={i}
                              highlighted={!!skill && p.skills.includes(skill)}
                            />
                          ))}
                        </div>
                      </Tabs.Content>
                    )}
                    {record === "experience" && (
                      <Tabs.Content value="experience" forceMount>
                        <div className="portfolio-intro">
                          <p>The chronicle: learning through doing.</p>
                          <span>2019 — 2026</span>
                        </div>
                        <div className="chronicle">
                          {experiences.map((e, i) => (
                            <Reveal
                              key={e.company}
                              delay={i * 0.06}
                              className="chronicle-entry"
                            >
                              <div className="chronicle-date">
                                {e.year}
                                <span />
                              </div>
                              <div className="chronicle-content">
                                <span className="eyebrow">{e.role}</span>
                                <h3>{e.company}</h3>
                                <p>{e.text}</p>
                                <div className="tags">
                                  {e.tags.map((t) => (
                                    <span key={t}>{t}</span>
                                  ))}
                                </div>
                              </div>
                              <Icon name={e.icon} />
                            </Reveal>
                          ))}
                        </div>
                      </Tabs.Content>
                    )}
                    {record === "awards" && (
                      <Tabs.Content value="awards" forceMount>
                        <div className="portfolio-intro">
                          <p>Recognition from the community.</p>
                          <span>Awards received in 2022</span>
                        </div>
                        <div className="awards">
                          {awards.map((a, i) => (
                            <Reveal key={a} className="award">
                              <div className="award-medal">
                                <Icon
                                  name={
                                    i === 0
                                      ? "crown"
                                      : i === 1
                                        ? "shield"
                                        : "medal"
                                  }
                                />
                              </div>
                              <div>
                                <span className="eyebrow">
                                  2022 / Community recognition
                                </span>
                                <h3>{a}</h3>
                              </div>
                              <span className="award-roman">
                                {["I", "II", "III"][i]}
                              </span>
                            </Reveal>
                          ))}
                        </div>
                      </Tabs.Content>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Tabs.Root>
            </section>
            <section id="contact" className="contact-section">
              <Reveal className="contact-inner">
                <div className="correspondence-seal">
                  <Icon name="mail" />
                </div>
                <div>
                  <span className="eyebrow">03 / Correspondence</span>
                  <h2>
                    Let’s build
                    <br />
                    <em>something useful.</em>
                  </h2>
                  <p>Open to software, AI & data opportunities.</p>
                </div>
                <a
                  className="button primary contact-button"
                  href="mailto:kuzeyozturac2@gmail.com"
                >
                  Get in touch <Icon name="arrow" />
                </a>
                <a
                  className="contact-email"
                  href="mailto:kuzeyozturac2@gmail.com"
                >
                  kuzeyozturac2@gmail.com
                </a>
              </Reveal>
            </section>
          </main>
          <footer>
            <a href="#character" className="footer-mark">
              KO <span>Kuzey Ozturac</span>
            </a>
            <span>© {new Date().getFullYear()} · The record continues.</span>
            <a href="#character">
              Back to top <Icon name="right" />
            </a>
          </footer>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

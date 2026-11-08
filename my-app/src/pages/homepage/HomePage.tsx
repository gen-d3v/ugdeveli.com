import { useEffect, useRef, useState, type MouseEvent } from "react";
import Card, { type ProjectStatus } from "../../components/card/Card";
import ProjectModal from "../../components/modal/ProjectModal";
import styles from "./Homepage.module.css";
import { NDA, gitHub, kilic, auas } from "../../assets";
import {
  ansible,
  debianLinux,
  docker,
  git,
  hibernate,
  java,
  openTofu,
  postgreSql,
  proxmox,
  react,
  spring,
  ts,
  vue,
} from "../../assets/logo";
import { AnimatePresence } from "motion/react";

function scrollToSection(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  logo?: string;
  status: ProjectStatus;
};

const techStack = [
  { name: "Java", logo: java },
  { name: "TypeScript", logo: ts },
];

const frameworks = [
  { name: "Spring Boot", logo: spring },
  { name: "React", logo: react },
  { name: "Vue.js", logo: vue },
  { name: "PostgreSQL", logo: postgreSql },
  { name: "JPA / Hibernate", logo: hibernate },
];

const infrastructure = [
  { name: "Proxmox VE", logo: proxmox },
  { name: "Git", logo: git },
  { name: "Docker", logo: docker },
  { name: "Ansible", logo: ansible },
  { name: "Debian Linux", logo: debianLinux },
  { name: "OpenTofu", logo: openTofu },
];

const projects: Project[] = [
  {
    id: "update-monitor",
    title: "Update Monitor 2026",
    summary:
      "Automates the detection and notification of software updates for customer applications.",
    description: `
This is an ongoing internship project I am developing during the third year of my bachelor's degree. As the sole engineer, I am responsible for its design and development, incorporating input from the customer.

The project aims to reduce the manual effort required to check whether updates are available for customer applications. The solution is being developed to use several detection methods, including APIs, RSS feeds, web scraping, and browser automation. It is being built with Spring Boot, with WebMagic for web scraping.

Due to a non-disclosure agreement, I cannot share the source code or repository.
    `,
    logo: NDA,
    status: "in-progress",
  },
  {
    id: "workforce-crm",
    title: "Privacy-Focused Workforce CRM 2026",
    summary:
      "A web application for securely managing workers and employment relationships.",
    description: `
A Spring Boot application designed to help a local security company manage employee records and employment-related administration. The project is being developed with data protection and GDPR requirements in mind, including the encryption of sensitive information, with the goal of preparing it for practical use.

Development is currently on hold while I focus on my internship.
    `,
    logo: kilic,
    status: "on-hold",
  },
  {
    id: "proxmox-home-lab",
    title: "Proxmox Home Lab 2026",
    summary: "Three-node home cluster automated with OpenTofu and Ansible.",
    description: `
This is a continuously evolving project. A previous school project sparked my interest in self-hosting and cloud infrastructure, so I bought refurbished enterprise-grade computers and built my own homelab. I continue to expand and adapt it, using it to develop and test other projects before deploying them to production.

I use OpenTofu to provision virtual machines and Ansible to automate server management. The homelab also hosts virtual machines running PostgreSQL and Docker containers.

A Raspberry Pi serves as my Ansible control node, allowing me to remotely wake servers over Wake-on-LAN and shut them down when they are not in use.
    `,
    logo: gitHub,
    status: "in-progress",
  },
  {
    id: "studio-cr-cloud",
    title: "Studio CR Cloud — Private Cloud for Cyber Resilience 2026",
    summary:
      "Proxmox-based platform for cybersecurity education and exercises.",
    description: `
This ambitious university project aimed to create a bare-metal environment where students from different universities could participate in penetration-testing competitions, Capture the Flag (CTF) challenges, and cyber wargames. Our team was responsible for sourcing the hardware and developing the platform’s business case.

During the early prototyping phase, I sourced and procured hardware for the team to experiment with while we developed the business case. Drawing on my experience with Raspberry Pi devices and Linux distributions, I also supported the developers with technical tasks. I reviewed network designs and provided feedback on risk treatment plans and the decision-making framework.

I acted as a liaison between the client and the team and also served as Product Owner. I communicated requirements and feedback, translating technical concepts for different audiences and helping turn discussions into clear objectives for the team. The team worked in an Agile environment.

As the project progressed, I became increasingly involved in governance discussions. I held several meetings with the AUAS Information Manager to explore whether the university’s infrastructure could host the project environments. Early on, we recognized that continuing along the planned path could eventually bring some activities into conflict with university policies. We identified this as a potential future risk; no policies had been breached. To support the governance process, I authored an Information Security and Privacy (IB&P) assessment documenting the project’s key security and privacy risks and requirements.

I also created a knowledge base for the next team and designed a hybrid architecture to support the project handover.
`,
    logo: auas,
    status: "completed",
  },
  {
    id: "election-results-explorer",
    title: "Election Results Explorer 2025",
    summary: "Spring Boot application for processing Dutch election results.",
    description: `
    This was my first Java project, and I learned Spring Boot and JPA/Hibernate while working on it. The goal was to help young adults engage with local and national politics. I was also introduced to Vue.js, although most of my work focused on the Java backend and XML data processing.

    My main contribution was designing and building an XML parser for the 2021 and 2023 and eventually the 2025 election datasets. I used a Domain-Driven Design (DDD) approach and kept the parsing logic separate from the election website. The parser supplied raw records that other team members could transform into relational data, while the application presented results at both national and constituency levels. Building it was challenging but rewarding, and gave me practical experience designing a data-processing component.

    The project introduced me to monorepos, architectural patterns, and database conventions. I also improved data-loading performance through query optimization, indexing, and caching, reducing the relevant load time from about 15 seconds to a few milliseconds.
    `,
    logo: auas,
    status: "completed",
  },
  {
    id: "webshop",
    title: "WebShop 2025",
    summary: "A TypeScript webshop for selling games.",
    description: `
    This was our first project working with product owners. Our task was to build a website for selling video games.
    
    This was also the project where software architecture started to click for me. It was my first hands-on experience with N-layer architecture, object-oriented design, separation of concerns, and dependency injection in TypeScript. Organizing the code into layers and folders helped me understand how to structure a project and separate responsibilities.
      
    I began applying these principles in my own work and experimenting with the project structure while keeping my contributions aligned with the team’s work. As I became more comfortable with the architecture, tasks that had initially taken me a couple of days began taking only a few hours.
    `,
    logo: auas,
    status: "completed",
  },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleMobileNavigation =
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;

      setHeaderVisible(currentScrollY < 80 || scrollingUp || mobileMenuOpen);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <div className={styles.homePage}>
      <div className={styles.portfolioShell}>
        <aside className={styles.leftSidebar}>
          <a
            className={styles.siteTitle}
            href="#about"
            onClick={scrollToSection("about")}
          >
            ugdeveli.com
          </a>

          <nav className={styles.sideNav} aria-label="Page sections">
            <a href="#about" onClick={scrollToSection("about")}>
              About
            </a>
            <a href="#experience" onClick={scrollToSection("experience")}>
              Experience
            </a>
            <a href="#tech-stack" onClick={scrollToSection("tech-stack")}>
              Tech Stack
            </a>
            <a href="#projects" onClick={scrollToSection("projects")}>
              Projects
            </a>
          </nav>

          <small className={styles.sidebarFooter}>
            © 2026 Umut Gençay Develi
          </small>
        </aside>

        <main className={styles.content}>
          <header id="about" className={styles.hero}>
            <p className={styles.greeting}>How you doin’?</p>
            <h1 className={styles.name}>I’m Umut Gençay Develi</h1>
            <p className={styles.nameNote}>I go by Gençay or Gen.</p>
            <h2 className={styles.role}>Software Engineering student</h2>

            <p>
              I’m a third-year student in the HBO-ICT bachelor’s programme,
              specializing in Software Engineering, at the Amsterdam University
              of Applied Sciences (AUAS). I expect to graduate in July 2028 and
              am currently working on a project as part of my internship.
            </p>

            <p>
              I take a problem-first approach to software development. I choose
              the technologies that best fit the problem, and I’m interested in
              how modern AI and LLM tools can support the development process.
            </p>

            <p>
              Alongside software development, I have experience working as a
              business engineer. I have created diagrams to communicate
              requirements, processes, and system designs, including C4 model
              diagrams (primarily levels 1 and 2), BPMN diagrams, and UML class
              and use case diagrams. I also served as product owner for Studio
              CR Cloud — Private Cloud for Cyber Resilience (2026), a university
              project.
            </p>
            <p>
              Outside of coding, I enjoy going to the gym, playing video games
              such as Cyberpunk 2077 and Elden Ring, watching TV shows and
              anime, and reading technology blogs.
            </p>
          </header>

          <section
            id="experience"
            className={styles.experience}
            aria-labelledby="experience-title"
          >
            <h2 id="experience-title">Experience</h2>

            <article>
              <h3>Software Engineering Intern</h3>
              <p className={styles.date}>Aug 2026 – present</p>
              <p>
                Working on a software solution for identifying available
                application updates, including backend development and
                integrations with external data sources.
              </p>
            </article>

            <article>
              <h3>Student Mentor — Amsterdam University of Applied Sciences</h3>
              <p className={styles.date}>Sept 2025 – July 2026</p>
              <p>
                Supported first-year students through code reviews and guidance
                on APIs, Web Components, object-oriented programming, and
                selected SOLID principles. The coursework primarily used
                TypeScript.
              </p>
            </article>
          </section>

          <section
            id="tech-stack"
            className={styles.techStack}
            aria-labelledby="tech-stack-title"
          >
            <h2 id="tech-stack-title">Tech Stack</h2>

            <div className={styles.techCategory}>
              <h3>Languages</h3>
              <ul className={styles.techGrid}>
                {techStack.map((tech) => (
                  <li className={styles.techItem} key={tech.name}>
                    <img src={tech.logo} alt="" />
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.techCategory}>
              <h3>Frameworks &amp; Data</h3>
              <ul className={styles.techGrid}>
                {frameworks.map((tech) => (
                  <li className={styles.techItem} key={tech.name}>
                    <img src={tech.logo} alt="" />
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.techCategory}>
              <h3>Infrastructure &amp; Tools</h3>
              <ul className={styles.techGrid}>
                {infrastructure.map((tech) => (
                  <li className={styles.techItem} key={tech.name}>
                    <img src={tech.logo} alt="" />
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">Projects</h2>

            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Card
                  id={project.id}
                  key={project.id}
                  title={project.title}
                  summary={project.summary}
                  logo={project.logo}
                  status={project.status}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.rightSidebar} aria-label="External links">
          <h2>Links</h2>

          <a className={styles.downloadButton} href="/files/cvUGD.pdf" download>
            Download CV
          </a>

          <a
            href="https://github.com/gen-d3v"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/gen%C3%A7ay-develi-744b29183/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles.contactButton}
            href="mailto:gencay98.develi@gmail.com"
          >
            Email
          </a>
        </aside>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key={selectedProject.id}
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
        <header
          className={`${styles.mobileHeader} ${
            headerVisible || mobileMenuOpen
              ? styles.mobileHeaderVisible
              : styles.mobileHeaderHidden
          }`}
        >
          <div className={styles.mobileBar}>
            <a className={styles.siteTitle} href="/">
              ugdeveli.com
            </a>

            <button
              className={styles.menuButton}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">{mobileMenuOpen ? "×" : "☰"}</span>
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>

          {mobileMenuOpen && (
            <nav
              className={styles.mobileNav}
              id="mobile-navigation"
              aria-label="Main navigation"
            >
              <a href="#about" onClick={handleMobileNavigation("about")}>
                About
              </a>
              <a
                href="#experience"
                onClick={handleMobileNavigation("experience")}
              >
                Experience
              </a>
              <a
                href="#tech-stack"
                onClick={handleMobileNavigation("tech-stack")}
              >
                Tech Stack
              </a>
              <a href="#projects" onClick={handleMobileNavigation("projects")}>
                Projects
              </a>

              <details className={styles.contactSubmenu}>
                <summary>
                  <span>Contact me</span>
                  <span className={styles.menuArrow} aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className={styles.socialLinks}>
                  <a href="/files/cvUGD.pdf" download>
                    Download CV
                  </a>
                  <a href="mailto:gencay98.develi@gmail.com">Email</a>
                  <a
                    href="https://github.com/gen-d3v"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gen%C3%A7ay-develi-744b29183/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </details>
            </nav>
          )}
        </header>
      </div>
    </div>
  );
}

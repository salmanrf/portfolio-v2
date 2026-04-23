import { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

type SectionProps = {
  section: {
    current: number;
    temp: number;
    switchTo(n: number): void;
  };
};

function Home() {
  // Section 1 === main, section 2 === about, section 3 === about
  const [actualSection, setActualSection] = useState(1);
  const [tempSection, setTempSection] = useState(1);

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setActualSection(tempSection);
    }, 250);
  }, [tempSection]);

  return (
    <div id="homepage-container">
      {(() => {
        if (actualSection === 1)
          return <Main section={{ current: 1, temp: tempSection, switchTo: setTempSection }} />;

        if (actualSection === 2)
          return <About section={{ current: 2, temp: tempSection, switchTo: setTempSection }} />;

        if (actualSection === 3)
          return <Skills section={{ current: 3, temp: tempSection, switchTo: setTempSection }} />;
      })()}
      <div id="home-navigation" style={{ bottom: actualSection !== 1 ? "25px" : "-10%" }}>
        <div
          className={`home-nav-link ${tempSection === 1 && "home-nav-link-active"}`}
          onClick={() => setTempSection(1)}
        >
          <div className="home-nav-link-bullet"></div>
          <span>Main</span>
        </div>
        <div
          className={`home-nav-link ${tempSection === 2 && "home-nav-link-active"}`}
          onClick={() => setTempSection(2)}
        >
          <div className="home-nav-link-bullet"></div>
          <span>About</span>
        </div>
        <div
          className={`home-nav-link ${tempSection === 3 && "home-nav-link-active"}`}
          onClick={() => setTempSection(3)}
        >
          <div className="home-nav-link-bullet"></div>
          <span>Skills</span>
        </div>
      </div>
    </div>
  );
}

function Main(props: SectionProps) {
  const { section } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (section.current !== section.temp) {
      setIsMounted(false);
    }
  }, [section, section.temp]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  return (
    <div
      id="home-main"
      style={{
        transform: isMounted ? "translateY(0%)" : "translateY(25%)",
        opacity: isMounted ? "1" : "0",
      }}
    >
      <Greetings />
      <Contacts />
      <HomeLinks switchSection={section.switchTo} />
    </div>
  );
}

function About(props: SectionProps) {
  const { section } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (section.current !== section.temp) {
      setIsMounted(false);
    }
  }, [section, section.temp]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  const yoe = ((Date.now() - new Date("2021-09-21").getTime()) / (60_000 * 60 * 24 * 365)).toFixed(1);

  return (
    <div
      className="home-section-container"
      style={{
        transform: isMounted ? "translateY(0%)" : "translateY(25%)",
        opacity: isMounted ? "1" : "0",
      }}
    >
      <div className="home-section-header">
        <span>salmanrf@About:~</span>
      </div>
      <div className="home-section-content">
        <h2>About Me</h2>
        <div className="content-section">
          <h3>Background</h3>
          <p>
            Hi! I am Salman Rizqi Fatih, a Full-Stack Engineer with {yoe} years of experience from Depok, West Java, Indonesia.
          </p>
          <p>
            In 2019, I enrolled in an undergraduate program in Electronics at Jakarta State Polytechnic (PNJ).
            The "Introduction to Programming in C" and "Digital Systems" courses quickly became my favorite classes.
          </p>
          <p>
            However, due to financial difficulties, I had to quit the program the following year and decided to carve my own path.
            Early in 2020, I started teaching myself Full-stack web development.
            After about a year of building my skills and portfolio, I finally landed my first job as a Full-Stack Developer in 2021.
          </p>
          <p>
            Nowadays, I work as a Full-stack Engineer, with a growing focus on Back-end engineering, low-level systems, and software architecture.
            In late 2024, I decided to take another chance on formal education, and enroll to Bachelor in "Information Systems".
          </p>
        </div>
        <div className="content-section">
          <h3>Education</h3>
          <div className="content-section-item">
            <h4>Indonesia Open University (2024 - Present) - Bachelor of Information Systems</h4>
            <h4></h4>
          </div>
          <div className="content-section-item">
            <h4>Self taught (2020 - 2021) - Full-Stack Web Development</h4>
          </div>
          <div className="content-section-item">
            <h4>SMKN 1 Cibinong (2014 - 2017) - Computer Engineering And Networking</h4>
          </div>
        </div>
        <div className="content-section">
          <h3>Professional Experience</h3>
          <div className="content-section-item">
            <h4>Gigradar.io - Full-Stack Engineer</h4>
            <h4>Feb 2025 - Present</h4>
          </div>
          <div className="content-section-item">
            <h4>Gradient Innovation - Full-Stack Engineer</h4>
            <h4>Apr 2023 - Dec 2024</h4>
          </div>
          <div className="content-section-item">
            <h4>Ozip Teknologi Nusantara - Full-Stack Developer</h4>
            <h4>Sept 2021 - Jan 2023</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skills(props: SectionProps) {
  const { section } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (section.current !== section.temp) {
      setIsMounted(false);
    }
  }, [section, section.temp]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  }, []);

  return (
    <div
      className="home-section-container"
      style={{
        transform: isMounted ? "translateY(0%)" : "translateY(25%)",
        opacity: isMounted ? "1" : "0",
      }}
    >
      <div className="home-section-header">
        <span>salmanrf@Skills:~</span>
      </div>
      <div className="home-section-content">
        <h2>Skills</h2>
        <div className="content-section-item">
          <p>Software Architecture</p>
        </div>
        <ul>
          <li>System Design</li>
          <li>Small to medium scale Distributed Systems</li>
        </ul>
        <div className="content-section-item">
          <p>Engineering Practices</p>
        </div>
        <ul>
          <li>Test Driven Development</li>
        </ul>
        <div className="content-section-item">
          <p>Back-end Development</p>
        </div>
        <ul>
          <li>Programming Languages: TypeScript, Go, Python, C</li>
          <li>Environment/Framework: NodeJS</li>
          <li>Database: MongoDB, PostgreSQL, ElasticSearch</li>
          <li>API Design: REST API, GraphQL</li>
        </ul>
        <div className="content-section-item">
          <p>Infrastructure</p>
        </div>
        <ul>
          <li>Platform: AWS, GCP</li>
          <li>Containerization: Docker</li>
          <li>Web Server: Nginx</li>
        </ul>
        <div className="content-section-item">
          <p>AI Applications Development</p>
        </div>
        <ul>
          <li>Libraries: LangChain, LangGraph</li>
          <li>MCP Development</li>
        </ul>
        <div className="content-section-item">
          <p>Front-end Development</p>
        </div>
        <ul>
          <li>Programming Languages: TypeScript, JavaScript</li>
          <li>Libraries/Framework: React, NextJS, Plasmo Framework</li>
          <li>State Management: Redux, Zustand</li>
        </ul>
      </div>
    </div>
  );
}

// ========= Home Main Sub-Components =========
const Greetings = () => {
  return (
    <div id="greetings">
      <div id="welcome">
        <h1>Welcome!</h1>
      </div>
      <div className="greeting-line">
        <h2>I'm</h2>
        <h1>Salman Rizqi Fatih</h1>
      </div>
      <div className="greeting-line">
        <h2>a</h2>
        <h1>Fullstack Developer</h1>
      </div>
    </div>
  );
};

function Contacts() {
  return (
    <div id="contacts">
      <a
        href="https://github.com/salmanrf"
        target="_blank"
        rel="noreferrer"
        className="contact-item"
      >
        <AiFillGithub />
        <span>salmanrf</span>
      </a>
      <a href="mailto:salmanrf2@gmail.com" className="contact-item">
        <HiOutlineMail />
        <span>salmanrf2@gmail.com</span>
      </a>
      <a href="https://www.linkedin.com/in/salman-r-123320128/" target="_blank" className="contact-item">
        <FaLinkedin />
        <span>Salman RF</span>
      </a>
    </div>
  );
}

function HomeLinks(props: { switchSection: (n: number) => void }) {
  return (
    <div id="home-links">
      <div className="home-link-item" onClick={() => props.switchSection(2)}>
        <span className="home-link-cursor"></span>
        <span className="home-link-link">About</span>
      </div>
      <div className="home-link-item" onClick={() => props.switchSection(3)}>
        <span className="home-link-cursor"></span>
        <span className="home-link-link">Skills</span>
      </div>
    </div>
  );
}
// ========= Home Main Sub-Components =========

export default Home;

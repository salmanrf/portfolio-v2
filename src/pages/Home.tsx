import { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import reacticon from "../assets/img/react.png";
import nextjsicon from "../assets/img/nextjs.png";
import nestjsicon from "../assets/img/nestjs.svg";
import jesticon from "../assets/img/jest.png";
import typescripticon from "../assets/img/typescript.png";
import graphqlicon from "../assets/img/graphql.png";
import golangicon from "../assets/img/golang.png";
import pythonicon from "../assets/img/python.png";
import gcpicon from "../assets/img/gcp.png";
import mongodbicon from "../assets/img/mongodb.png";
import postgresicon from "../assets/img/postgres.png";
import nodejsicon from "../assets/img/nodejs.png";
import redisicon from "../assets/img/redis.png";

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
            Hi! I am Salman Rizqi Fatih, a Full-Stack Web Developer from Depok, West Java,
            Indonesia.
          </p>
          <p>
            I started my self-taught Software Development journey in 2020, after having dropped out
            of college, and landed my first job as a Full-Stack developer in late 2021.
          </p>
        </div>
        <div className="content-section">
          <h3>Education</h3>
          <div className="content-section-item">
            <h4>Computer Engineering And Networking - </h4>
            <h4>SMKN 1 Cibinong (2014 - 2017)</h4>
          </div>
        </div>
        <div className="content-section">
          <h3>Professional Experience</h3>
          <div className="content-section-item">
            <h4>Gradient Innovation - Full-Stack Engineer</h4>
            <h4>Apr 2023 - Present</h4>
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
          <p>Full-Stack Web Development</p>
        </div>
        <div className="content-section-item">
          <p>REST/GraphQL API</p>
        </div>
        <div className="content-section-item">
          <p>Meta Platform Integration (Whatsapp & Instagram)</p>
        </div>
        <div className="content-section-item">
          <p>Payment Gateway Integration</p>
        </div>
        <div className="content-section-item">
          <p>Google Cloud Platform</p>
        </div>
        <div className="content-section-item">
          <p>Chrome Extension Development</p>
        </div>
        <div id="techstack">
          <p>Some of the technologies i've used: </p>
          <div id="techstack-container">
            <div className="stack">
              <ul>
                <li className="stack-item">
                  <img src={typescripticon} alt="tech-icon" />
                  <span>TypeScript</span>
                </li>
                <li className="stack-item">
                  <img src={jesticon} alt="tech-icon" />
                  <span>Jest</span>
                </li>
                <li className="stack-item">
                  <img src={reacticon} alt="tech-icon" />
                  <span>React</span>
                </li>
                <li className="stack-item">
                  <img src={nextjsicon} alt="tech-icon" />
                  <span>NextJs</span>
                </li>
                <li className="stack-item">
                  <img src={graphqlicon} alt="tech-icon" />
                  <span>GraphQL</span>
                </li>
              </ul>
            </div>
            <div className="stack">
              <ul>
                <li className="stack-item">
                  <img src={gcpicon} alt="tech-icon" />
                  <span>Google Cloud Platform</span>
                </li>
                <li className="stack-item">
                  <img src={nodejsicon} alt="tech-icon" />
                  <span>NodeJS</span>
                </li>
                <li className="stack-item">
                  <img src={nestjsicon} alt="tech-icon" />
                  <span>NestJS</span>
                </li>
                <li className="stack-item">
                  <img src={golangicon} alt="tech-icon" />
                  <span>Go</span>
                </li>
                <li className="stack-item">
                  <img src={pythonicon} alt="tech-icon" />
                  <span>Python</span>
                </li>
              </ul>
            </div>
            <div className="stack">
              <ul>
                <li className="stack-item">
                  <img src={postgresicon} alt="tech-icon" />
                  <span>PostgresSQL</span>
                </li>
                <li className="stack-item">
                  <img src={mongodbicon} alt="tech-icon" />
                  <span>MongoDB</span>
                </li>
                <li className="stack-item">
                  <img src={redisicon} alt="tech-icon" />
                  <span>Redis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
      <a href="https://www.facebook.com/salmanrfsrf/" target="_blank" className="contact-item">
        <FaFacebookSquare />
        <span>salmanrfsrf</span>
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

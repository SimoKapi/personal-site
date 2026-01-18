import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from "remark-breaks";

import './App.css'

import ImageCycle from './utils/ImageCycle';
import GithubLogo_dark from './assets/logos/github-mark-white.png';
import GithubLogo_light from './assets/logos/github-mark.png';
import ItchioLogo from './assets/logos/itchio.png';
import LinkedinLogo from './assets/logos/LI-In-Bug.png';
import CallToAction from './assets/call-to-action.png';
import DarkLight from './assets/dark-light.png';

import projects from './projects.json';
import work from './work.json';

import CopyableHeader from './CopyableHeader';

interface Entry {
    title: string;
    chips: string[];
    image?: string;
    body: string;
}

function App() {
  const caretRef = useRef<HTMLSpanElement>(null);
  const [githubLogo, setGithubLogo] = useState(GithubLogo_dark);

  useEffect(() => {
    let isToggled = true;
    const interval = setInterval(() => {
      if (caretRef.current) {
        if (isToggled) {
          caretRef.current.style.opacity = "1";
        } else {
          caretRef.current.style.opacity = "0";
        }
      }
      isToggled = !isToggled;
    }, 600)

    return () => clearInterval(interval);
  }, [])

  const [activeID, setActiveID] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveID(entry.target.id);
        }
      })
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('.project');
    sections.forEach((section) => observer.observe(section))

    return() => observer.disconnect();
  })

  function titleToID(title: string) {
    return encodeURIComponent(title)
  }

  function mapNavbar(file: Entry[]) {
    return (file.map((entry) => {
      return (<li className={activeID == titleToID(entry.title) ? 'active' : ''} key={titleToID(entry.title)}><a href={"#" + titleToID(entry.title)}>{entry.title}</a></li>)
    }))
  }

  function JsonEntryMap(source: Entry[]) {
    return (
        <>
            {source.map((entry) => {
            return (
              <div id={titleToID(entry.title)} className="project">
                <div className="header">
                  <CopyableHeader className="title" id={titleToID(entry.title)}>{entry.title}</CopyableHeader>
                  <div className="chips">
                    {entry.chips.map((chip:string) => {
                      return (<span className="chip">{chip}</span>)
                    })}
                  </div>
                </div>
                <div className="info" style={{ whiteSpace: 'pre-wrap' }}>
                  {entry.image &&
                    <img className="coverImage" src={entry.image}/>
                  }
                  <ReactMarkdown remarkPlugins={[remarkBreaks]} components={{
                    a: ({node, ...props}) => {
                      return(<a target="_blank" {...props}/>)
                    }
                  }}>{entry.body}</ReactMarkdown>
                </div>
              </div>
            )
          })}
        </>
    )
  }

  useEffect(() => {
    loadTheme();
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id)

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({behavior: 'smooth'});
        }, 100);
      }
    }
  }, [])

  function getCookie(cname: string): string {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let c = cookieArray[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function loadTheme() {
    let theme = getCookie('theme');
    if (theme) {
      setTheme(theme)
    } else {
      document.cookie = "theme=dark";
      setTheme('dark')
    }
  }

  function setTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    document.cookie = "theme=" + theme
    setGithubLogo(theme == 'dark' ? GithubLogo_dark : GithubLogo_light);
  }

  function toggleTheme() {
    let currentTheme = getCookie('theme');
    setTheme(currentTheme == 'dark' ? 'light' : 'dark')
    console.log(document.cookie)
  }

  return (
    <>
      <button id="theme-toggle" onClick={() => toggleTheme()}>
        <img src={DarkLight}/>
      </button>
      <div id="cover" className="dotted-bg">
        <div className="info">
          <div id="name">
            <h1>Simon</h1>
            <h1>Kapicka<span ref={caretRef}>_</span></h1>
            <span className="location"><p>{/* California native 🇺🇸 <br/> */}📍 Based in Prague, Czechia 🇨🇿</p></span>
          </div>
          <div id="socials">
            <a href="https://simokapi.itch.io/" target="_blank"><img src={ItchioLogo}/></a>
            <a href="https://www.linkedin.com/in/simon-kapicka-95254b293/" target="_blank"><img src={LinkedinLogo}/></a>
            <a href="https://github.com/simokapi" target="_blank"><img src={githubLogo}/></a>
            <img src={CallToAction} id="call-to-action" draggable="false"/>
          </div>
        </div>
        <div className="images">
          <ImageCycle/>
        </div>
      </div>
      <div id="body">
        <div id="nav">
          <a href="/cv.pdf" target="_blank" className="button w-full">View my CV</a>
          <ul className="dotted-bg-strong">
            <li key="header" className="header">Navigation</li>
            <li key="about" className="subHeader"><a href="#about">About me</a></li>
            <li key="work" className="subHeader"><a href="#work">Work experience</a></li>
            {mapNavbar(work)}
            <li key="projects" className="subHeader"><a href="#projects">Projects</a></li>
            {mapNavbar(projects)}
            <li key="contact" className="subHeader"><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div id="content">
          {/* <a href="/cv.pdf" target="_blank" className="button">View my CV</a> */}

          <h1 className="subtitle" id="about">About me <a className="url" href="#about">#</a></h1>
          <p>I've been programming ever since I was eight years old. It's always been my "productive fun", especially in my Minecraft plugin era where I would playtest my plugins... and perhaps get carried away and beat the game. That's also why I first tried out game development, like my <a href={"#" + titleToID("Bouncer")}>Bouncer</a> VR game.</p>
          <br/>
          <p>Since 2024, I've been interested in bridging my passion for programming and development with health and biology, which is why I'd like to pursue a path in Biomedical Engineering. Check out my cool related <a href={"#" + titleToID("VAD (heart pump) telemetry system")}>VAD telemetry system</a> project!</p>
          <br/>
          <p>I'm currently 18 years old, a high school senior at Nový PORG in Prague.</p>

          <CopyableHeader id="work" className="subtitle">Work Experience</CopyableHeader>
          {JsonEntryMap(work)}

          <CopyableHeader id="projects" className="subtitle">Projects</CopyableHeader>
          {/* <h1 className="subtitle" id="projects">Projects <a className="url" href="#projects">#</a></h1> */}
          {JsonEntryMap(projects)}
          <CopyableHeader id="contact" className='subtitle'>Contact</CopyableHeader>
          <p>Feel free to contact me at <a href="mailto:simon.kapicka@gmail.com">simon.kapicka@gmail.com</a></p>
        </div>
        <div id="progress">
          
        </div>
      </div>
      <div id="footer">
      </div>
    </>
  )
}

export default App
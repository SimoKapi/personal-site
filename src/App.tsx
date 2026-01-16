import { useEffect, useRef, useState } from 'react'

import './App.css'

import ImageCycle from './utils/ImageCycle';
import GithubLogo from './assets/logos/github-mark-white.png';
import ItchioLogo from './assets/logos/itchio.png';
import LinkedinLogo from './assets/logos/LI-In-Bug.png';

import projects from './projects.json';
import work from './work.json';

interface Entry {
    title: string;
    chips: string[];
    image?: string;
    body: string;
}

function App() {
  const caretRef = useRef<HTMLSpanElement>(null);

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
    return title.replace(" ", "")
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
                  <div className="title">
                    <h1>{entry.title}</h1>
                    <a className="url" href={"#" + titleToID(entry.title)}>#</a>
                  </div>
                  <div className="chips">
                    {entry.chips.map((chip:string) => {
                      return (<span className="chip">{chip}</span>)
                    })}
                  </div>
                </div>
                <div className="info">
                  {entry.image &&
                    <img className="coverImage" src={entry.image}/>
                  }
                  <p className="textContent">{entry.body}</p>
                </div>
              </div>
            )
          })}
        </>
    )
  }

  return (
    <>
      <div id="cover" className="dotted-bg">
        <div className="info">
          <div id="name">
            <h1>Simon</h1>
            <h1>Kapicka<span ref={caretRef}>_</span></h1>
            <span className="location"><p>California native 🇺🇸 <br/>📍 Based in Prague, Czechia 🇨🇿</p></span>
          </div>
          <div id="socials">
            <a href="https://github.com/simokapi" target="_blank"><img src={GithubLogo}/></a>
            <a href="https://www.linkedin.com/in/simon-kapicka-95254b293/" target="_blank"><img src={LinkedinLogo}/></a>
            <a href="https://simokapi.itch.io/" target="_blank"><img src={ItchioLogo}/></a>
          </div>
        </div>
        <div className="images">
          <ImageCycle/>
        </div>
      </div>
      <div id="body">
        <div id="nav">
          {/* <img id="profile-pic" src="/imgs/profilepic.jpg"/>
          <h1 id="about-nav">Simon Kapicka</h1> */}
          <ul className="dotted-bg-strong">
            <li key="header" className="header">Navigation</li>
            <li key="work" className="subHeader"><a href="#work">Work experience</a></li>
            {mapNavbar(work)}
            <li key="projects" className="subHeader"><a href="#projects">Projects</a></li>
            {mapNavbar(projects)}
            <li key="about" className="subHeader"><a href="#about">About</a></li>
            <li key="contact" className="subHeader"><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div id="content">
          <h1 id="work" className="subtitle">Work experience <a className="url" href="#work">#</a></h1>
          {JsonEntryMap(work)}

          <h1 className="subtitle" id="projects">Projects <a className="url" href="#projects">#</a></h1>
          {JsonEntryMap(projects)}

          <h1 className="subtitle" id="about">About me <a className="url" href="#about">#</a></h1>
          <p>I was born in California and spent a large portion of my life programming. Ever since I was 8, I've been learning new languages, techniques and skills to allow me to develop applications and tools.</p>
          <br></br>
          <p>Currently 18 years old, I'm a High School student interested in a Computer Science / Software Development career.</p>

          <h1 className="subtitle" id="contact">Contact <a className="url" href="#contact">#</a></h1>
          <p>Feel free to contact me with inquiries at <a href="mailto:simon.kapicka@gmail.com">simon.kapicka@gmail.com</a></p>
        </div>
        <div id="progress">
          
        </div>
      </div>
    </>
  )
}

export default App
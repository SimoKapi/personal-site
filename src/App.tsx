import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';

import './App.css'

import GithubLogo_dark from './assets/logos/github-mark-white.png';
import GithubLogo_light from './assets/logos/github-mark.png';
import DarkLight from './assets/dark-light.png';

import Projects from './pages/Projects';
import Main from './pages/Main';
import Footer from './utils/Footer';

// Projects
import Rasterizer from './pages/projects/Rasterizer';

export interface Entry {
    title: string;
    chips: string[];
    images: string[];
    body: string;
    more?: string;
    construction?: boolean;
}

export function titleToID(title: string) {
  return encodeURIComponent(title)
}

export function mapNavbar(file: Entry[], activeID: string) {
  return (file.map((entry) => {
    return (<li className={activeID == titleToID(entry.title) ? 'active' : ''} key={titleToID(entry.title)}><a href={"#" + titleToID(entry.title)}>{entry.title}</a></li>)
  }))
}

let githubLogo = GithubLogo_dark
export function getGithubLogo() {
  return githubLogo
}

function setGithubLogo(logo: any) {
  githubLogo = logo
}

function App() {
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
    <BrowserRouter>
      <ScrollToTop/>
      <button id="theme-toggle" onClick={() => toggleTheme()}>
        <img src={DarkLight}/>
      </button>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Main activeID={activeID}/>} />
        <Route path="/projects" element={<Projects/>}>
          <Route path="rasterizer" element={<Rasterizer/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
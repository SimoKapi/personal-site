import { useEffect, useRef } from 'react'

import './App.css'

import Header from './Header';

import ImageCycle from './utils/ImageCycle';
import GithubLogo from './assets/logos/github-mark-white.png';
import ItchioLogo from './assets/logos/itchio.png';
import LinkedinLogo from './assets/logos/LI-In-Bug.png';

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

  return (
    <>
      <div id="cover">
        <div className="info">
          <div id="name">
            <h1>Simon</h1>
            <h1>Kapicka<span ref={caretRef}>_</span></h1>
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
      <Header/>
      <div id="body">

      </div>
    </>
  )
}

export default App
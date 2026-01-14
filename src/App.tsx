import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div id="header">
          <h1 className="animateText">Simon <span className="accent">Kapicka</span></h1>
          <div className="horizontalFlex">
              <div className="verticalFlex">
                  <h2>freelance website & software developer</h2>
                  <div className="buttons">
                      <a href="cv.pdf" target="_blank">Portfolio</a>
                      <a href="#about">About</a>
                  </div><br />
                  <div className="socials">
                      <a href="https://github.com/simokapi" target="_blank"><img src="imgs/logos/github-mark-white.png" /></a>
                      <a href="https://www.linkedin.com/in/simon-kapicka-95254b293/" target="_blank"><img src="imgs/logos/LI-In-Bug.png" /></a>
                      <a href="https://simokapi.itch.io/" target="_blank"><img src="imgs/logos/itchio.png" /></a>
                  </div>
              </div>
              <img draggable="false" className="profilepic" src="imgs/profilepic.jpg" />
          </div>
      </div>
    </>
  )
}

export default App

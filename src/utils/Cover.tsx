import './Cover.css'

import { useEffect, useRef } from "react";

import { getGithubLogo } from "../App"
import ImageCycle from "./ImageCycle";

import LinkedinLogo from '../assets/logos/LI-In-Bug.png';
import CallToAction from '../assets/call-to-action.png';
import ItchioLogo from '../assets/logos/itchio.png';

function Header() {
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
            <a href="https://github.com/simokapi" target="_blank"><img src={getGithubLogo()}/></a>
            <img src={CallToAction} id="call-to-action" className="invert-on-dark" draggable="false"/>
        </div>
        </div>
        <div className="images">
            <ImageCycle/>
        </div>
    </div>
    )
}

export default Header
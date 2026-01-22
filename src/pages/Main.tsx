import './Main.css';
import { useEffect, useState } from 'react';

import CopyableHeader from "../CopyableHeader";
import { mapNavbar, titleToID } from "../App";
import type { Entry } from "../App";
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown'
import remarkBreaks from "remark-breaks";

import Cover from '../utils/Cover';
import Construction from '../utils/Construction';

import projects from '../projects.json';
import work from '../work.json';

function Main() {
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
    }, [])

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
                    {entry.images && entry.images.map((img:string) => {
                    return (<img className="coverImage" src={img}/>)
                    })}
                    {entry.construction && <Construction/>}
                    <ReactMarkdown remarkPlugins={[remarkBreaks]} components={{
                    a: ({node, ...props}) => {
                        return(<a target="_blank" {...props}/>)
                    }
                    }}>{entry.body}</ReactMarkdown>
                    {entry.more &&
                    <Link to={"/projects/"+entry.more} className="projectRedirect">Learn more!</Link>
                    }
                </div>
                </div>
            )
            })}
        </>
    )
    }

    return (
    <>
    <Cover/>
    <div id="body">
        <div id="nav">
          <a href="/cv.pdf" target="_blank" className="button w-full">View my CV</a>
          <ul className="dotted-bg-strong">
            <li key="header" className="header">Navigation</li>
            <li key="apps" className="subHeader"><a href="#apps">App quicklinks</a></li>
            <li key="about" className="subHeader"><a href="#about">About me</a></li>
            <li key="work" className="subHeader"><a href="#work">Work experience</a></li>
            {mapNavbar(work, activeID)}
            <li key="projects" className="subHeader"><a href="#projects">Projects</a></li>
            {mapNavbar(projects, activeID)}
            <li key="contact" className="subHeader"><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div id="content">
          <CopyableHeader id="apps" className="subtitle">App quicklinks</CopyableHeader>
          <div className="flex gap-5">
            <a href="https://plants.simokapi.com" target="_blank" className="button w-full">PlantIdentifier</a>
            <a href="https://storage.simokapi.com" target="_blank" className="button w-full">Dropstorage</a>
          </div>

          <h1 className="subtitle" id="about">About me <a className="url" href="#about">#</a></h1>
          <p>I've been programming ever since I was eight years old. It's always been my "productive fun", especially in my Minecraft plugin era where I would playtest my plugins... and perhaps get carried away and beat the game. That's also why I first tried out game development, like my <a href={"#" + titleToID("Bouncer")}>Bouncer</a> VR game.</p>
          <br/>
          <p>Since 2024, I've been interested in bridging my passion for programming and development with health and biology, which is why I'd like to pursue a path in Biomedical Engineering. Check out my cool related <a href={"#" + titleToID("VAD (heart pump) telemetry system")}>VAD telemetry system</a> project!</p>
          <br/>
          <p>I'm currently 18 years old, a high school senior at Nový PORG in Prague.</p>

          <CopyableHeader id="work" className="subtitle">Work Experience</CopyableHeader>
          {JsonEntryMap(work)}

          <CopyableHeader id="projects" className="subtitle">Projects</CopyableHeader>
          {JsonEntryMap(projects)}
          <CopyableHeader id="contact" className='subtitle'>Contact</CopyableHeader>
          <p>Feel free to contact me at <a href="mailto:simon.kapicka@gmail.com">simon.kapicka@gmail.com</a></p>
        </div>
        <div id="progress">
          
        </div>
      </div>
    </>
    )
}

export default Main
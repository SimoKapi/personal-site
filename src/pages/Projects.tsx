import './Projects.css'

import { Outlet } from "react-router-dom"
import Header from "../utils/Header"
import 'katex/dist/katex.min.css';

function Projects() {
    return (
        <>
        <Header/>
        <div id="projectBody" className='dotted-bg'>
            <Outlet/>
        </div>
        </>
    )
}

export default Projects
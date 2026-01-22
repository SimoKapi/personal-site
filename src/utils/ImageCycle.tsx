import { useEffect, useState } from 'react'
import cursorImage from '../assets/cursor.png'

import './ImageCycle.css'

import Pause from '../assets/picture-pause.png';

const imageModules = import.meta.glob('../assets/image_cycle/*', {eager: true})
const images = Object.values(imageModules).map((mod: any) => mod.default);
function ImageCycle() {
    const [imageIndex, setImageIndex] = useState(0);
    const [phase, setPhase] = useState<'reveal' | 'carousel' | 'idle' | 'prepare'>('reveal');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (phase == 'idle' && !isHovered) {
            const timer = setTimeout(() => setPhase('carousel'), 1000);
            return () => clearTimeout(timer);
        }
    }, [phase, isHovered])

    const handlePhaseEnd = () => {
        if (phase == 'reveal') {
            setPhase('idle')
        } else if (phase == 'carousel') {
            setPhase('prepare');
            setImageIndex((prev) => (prev + 1) % images.length);

            setTimeout(() => setPhase('reveal'), 100);
        }
    }

    function handleMouseEvent(callback: () => void) {
        if (window.matchMedia('(hover: hover)').matches) {
            callback();
        }
    }

    return (
        <div id="cursorAnimation"
            onMouseEnter={() => handleMouseEvent(() => setIsHovered(true))}
            onMouseLeave={() => handleMouseEvent(() => setIsHovered(false))}>
            <img src={Pause} id="pause-on-hover" className="invert-on-dark" draggable="false"/>
            <div id="imageSwap">
                <img id="grayscaleImage" draggable='false' src={images[imageIndex]} className={phase == 'carousel' ? 'run-carousel' : ''}/>
                <img id="nextImage" draggable='false' src={images[(imageIndex + 1) % images.length]} className={phase == 'carousel' ? 'run-carousel' : ''} onAnimationEnd={handlePhaseEnd}/>
            </div>
            <img id="imageReveal" src={images[imageIndex]} draggable='false' className={phase == 'reveal' ? 'run-reveal' : (phase == 'carousel' || phase == 'prepare' ? 'fade' : '')}/>
            <div id="cursor" className={phase == 'reveal' ? 'run-cursor' : ''} onAnimationEnd={handlePhaseEnd}>
                <img className="invert-on-dark" src={cursorImage} draggable='false'/>
            </div>
        </div>
    )
}

export default ImageCycle
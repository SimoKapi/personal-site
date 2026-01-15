import { useState } from 'react'
import cursorImage from '../assets/cursor.png'

import './ImageCycle.css'

const imageModules = import.meta.glob('../assets/image_cycle/*.jpg', {eager: true})
const images = Object.values(imageModules).map((mod: any) => mod.default);
function ImageCycle() {
    const [imageIndex, setImageIndex] = useState(0);
    const [phase, setPhase] = useState<'reveal' | 'carousel' | 'idle'>('reveal');

    const handlePhaseEnd = () => {
        if (phase == 'reveal') {
            setPhase('carousel');
        } else if (phase == 'carousel') {
            setImageIndex((prev) => (prev + 1) % images.length);
            setPhase('idle');

            setTimeout(() => setPhase('reveal'), 1000)
        }
    }

    return (
        <div id="cursorAnimation">
            <div id="imageSwap">
                <img id="grayscaleImage" src={images[imageIndex]} className={phase == 'carousel' ? 'run-carousel' : ''}/>
                <img id="nextImage" src={images[(imageIndex + 1) % images.length]} className={phase == 'carousel' ? 'run-carousel' : ''} onAnimationEnd={handlePhaseEnd}/>
            </div>
            <img id="imageReveal" src={images[imageIndex]} className={phase == 'reveal' ? 'run-reveal' : (phase == 'carousel' ? 'hidden' : 'visible')}/>
            <div id="cursor" className={phase == 'reveal' ? 'run-cursor' : ''} onAnimationEnd={handlePhaseEnd}>
                <img src={cursorImage}/>
            </div>
        </div>
    )
}

export default ImageCycle
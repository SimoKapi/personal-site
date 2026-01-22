import Test from '/imgs/projects/eyboard/test.jpeg';
import Setup from '/imgs/projects/eyboard/setup.png';

import Construction from '../../utils/Construction';

function Eyboard() {
    return (<>
    <div className='header-project'>
        <h1>Eyboard</h1>
        <div className="chips">
            <span className="chip">Python</span>
            <span className="chip">OpenCV</span>
            <span className="chip">Mediapipe</span>
        </div>
        <a href="https://github.com/SimoKapi/Eyboard" target="_blank">View Source on GitHub →</a>
    </div>
    <Construction/>
    <div className="section grid md:grid-cols-2 gap-8">
        <img src={Test}/>
        <img src={Setup}/>
    </div>
    </>)
}

export default Eyboard
import Renderer from '/imgs/renderer.png'

import { BlockMath, InlineMath } from 'react-katex';
import Fail from '/imgs/projects/rasterizer/fail.png';
import Projection from '/imgs/projects/rasterizer/projection.png';

function Rasterizer() {
    return (
        <>
          <div className='header-project'>
            <h1>Java Rasterizer</h1>
            <div className="chips">
              <span className="chip">Java</span>
              <span className="chip">Matrix transformations</span>
            </div>
            <a href="https://github.com/SimoKapi/Renderer" target="_blank">View Source on GitHub →</a>
          </div>
          {/* <img src={Renderer}/> */}
          <div className="section grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img src={Renderer}/>
            </div>
            <p>This project only uses projection and perspective calculations that were implemented by me. I wanted to learn more about them, and the low-level mathematics behind graphics engines, so I decided to not use any rendering engines.</p>
          </div>

          <h1 className='subheader-project'>So... how does it work?</h1>
          <h2 className='subsubheader-project'>Spatial transformation</h2>
          <p>The camera <InlineMath math='C = (C_x, C_y, C_z)'/> can have a non-zero position and rotation, as is the case in almost any 3D graphics engine with a movable scene. This is why all vertices must be transformed so that they are relative to the camera, in other words, placing the camera at the origin <InlineMath math='O = (0, 0, 0)'/>. To do this, we simply subtract the position of the camera from each vertex <InlineMath math='P = (P_x, P_y, P_z)'/>, resulting in <InlineMath math="P' = (P_x - C_x, P_y - C_y, P_z - C_z)"/>.</p>
          <p>Now the camera is at the origin. Next, we must apply rotational transformations, to rotate the scene around the camera. This is done by rotating by multiplying the positions of each vertex by a rotation matrix, rotating them around the origin. Each axis of rotation has a different matrix, as shown below.</p>
          <BlockMath math={
            `R_x(\\theta) = \\begin{pmatrix}
            1 & 0 & 0 \\\\
            0 & cos\\theta & -sin\\theta \\\\
            0 & sin\\theta & cos\\theta
            \\end{pmatrix}`
            }/>

          <BlockMath math={
            `R_y(\\theta) = \\begin{pmatrix}
            cos\\theta & 0 & sin\\theta \\\\
            0 & 1 & 0 \\\\
            -sin\\theta & 0 & cos\\theta
            \\end{pmatrix}`
            }/>
          
          <BlockMath math={
            `R_z(\\theta) = \\begin{pmatrix}
            cos\\theta & -sin\\theta & 0 \\\\
            sin\\theta & cos\\theta & 0 \\\\
            0 & 0 & 1
            \\end{pmatrix}`
            }/>

          <h2 className="subsubheader-project">Perpsective transformation</h2>
          <p>Now we have our transformed vertices. Next, we must project them from three dimensions onto two, using perspective transformation calculations. They're actually really simple to derive, as it all comes from the similarity of triangles.</p>
          <p>The projection of point <InlineMath math='P = (P_x, P_y, P_z)'/> onto a screen positioned at <InlineMath math='E = (E_x, E_y, E_z)'/> relative to the camera can be visualized on a right triangle below, viewed from the side. This gives the projected <InlineMath math='y'/> coordinate, and the same visualization can be used to obtain the projected <InlineMath math='x'/> coordinate.</p>
          <p>The two similar triangles created both start in the origin <InlineMath math='O'/>, and stretch out to either the <InlineMath math='y'/> point or the <InlineMath math='P_y'/> point. Because they are similar, the ratios of their side lengths must remain the same; thus, <InlineMath math='\frac{P_z}{P_y} = \frac{E_z}{Ey}'/></p>
          <p>We can use this similarity to find the distance <InlineMath math='|Ey| = E_z \cdot \frac{P_z}{P_y}'/></p>
          <img src={Projection} className="w-1/2 m-auto invert-on-dark pb-2"/>
          <p>The same approach can be taken on a different axis to find <InlineMath math='|Ex| = E_z \cdot \frac{P_z}{P_x}'/></p>

          <h2 className="subsubheader-project">Backface culling</h2>
          <p>These are all the steps necessary to transform points from a 3D environment into a 2D environment. However, there are optimizations that can be done — including backface culling, where only the faces that are facing the camera are rendered.</p>
          <p>In solid objects, this makes sense, as any faces facing away will be obscured by other faces oriented towards the camera. Since our vertices are already transformed relative to the camera, this is simple to check.</p>
          <p>We first obtain the normal vector of a given face by utilizing the cross product of vectors. Let's represent a face with three points, <InlineMath math='A\ B\ C'/>. Two vectors are <InlineMath math='\vec{AB}'/> and <InlineMath math='\vec{AC}'/>. The cross product of vectors is shown below</p>
          <BlockMath math={
            `N = \\vec{AB} \\times \\vec{AC} = \\begin{pmatrix}
            \\vec{AB}_y\\vec{AC}_z - \\vec{AB}_z\\vec{AC}_y \\\\
            \\vec{AB}_z\\vec{AC}_x - \\vec{AB}_x\\vec{AC}_z \\\\
            \\vec{AB}_x\\vec{AC}_y - \\vec{AB}_y\\vec{AC}_x
            \\end{pmatrix}`
            }/>
          <p>Since the points are in a space relative to the camera, all we need to do is check if <InlineMath math='N_z'/> is negative. If yes, we render the face, otherwise we skip the calculations.</p>
          <p>On average, this eliminates roughly half (~50%) of unnecessary renders, saving time and computational power.</p>

          <h1 className='subheader-project'>Fun Fact:</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <p className='col-span-'>Did you know that if you treat degrees as radians in calculations, the whole render gets broken? I scratched head over that for days before I found the problem. Here's how it looked with the error:</p>
            <img className="col-span-1" src={Fail}/>
          </div>
        </>
    )
}

export default Rasterizer
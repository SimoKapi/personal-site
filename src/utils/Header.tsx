import './Header.css'

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'

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
    <div id="header">
      <Link to="/" className="name">Simon Kapicka<span ref={caretRef}>_</span></Link>
    </div>
  )
}

export default Header
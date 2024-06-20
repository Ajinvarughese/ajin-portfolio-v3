import { useState, useEffect, useRef } from "react";
import Data from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/fontawesome-free-solid'

function Navbar(props) {
    const [currentPage, setCurrentPage] = useState(props.active);
    const [nav, setNav] = useState(false);
    const [scrolled, setScolled] = useState(false);
    const navRef = useRef(null);

    const data = Data().navbar;

    const showNav = () => {
        setNav((prev) => !prev);
    }

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setNav(false);
        }
    }

    useEffect(() => {
        if (nav) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [nav]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if(scrollY > 0) {
                setScolled(true);
            }else {
                setScolled(false);
            }
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const reload = () => {
        window.location.href = '/';
    }
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const [currentTheme, setCurrentTheme] = useState(getCookie('theme') == 'dark'? true : false);
    
    const mode = () => {
        if(currentTheme) {
            document.documentElement.classList.toggle('light-mode');
            document.cookie = `theme=light;path=/;`;
            setCurrentTheme(false);
        }else {
            document.documentElement.classList.remove('light-mode');
            document.cookie = `theme=dark;path=/;`;
            setCurrentTheme(true);
        }
        setNav(false);
    }


    return (
        <>
            <div className={`navbar ${scrolled ? '': 'scrolled'}`} ref={navRef}>
                
                <h1 className="logo" onClick={reload}>&lt;{data.logo} /&gt;</h1>
                
                <ul
                    id="navLinks"
                    className={`navLinks ${nav ? 'active' : ''}`}
                    style={{ left: nav ? '50%' : '-110%' }}
                >
                    <li className={currentPage === "home" ? "activey" : ""}>
                        <a href="/">Home</a>
                    </li>
                    <li className={currentPage === "about" ? "activey" : ""}>
                        <a href="/about">About</a>
                    </li>
                    <li className={currentPage === "skills" ? "activey" : ""}>
                        <a href="/skills">My skills</a>
                    </li>
                    <li className={currentPage === "projects" ? "activey" : ""}>
                        <a href="/projects">Projects</a>
                    </li>
                    <li className={currentPage === "contact" ? "activey" : ""}>
                        <a href="/contact">Contact</a>
                    </li>

                    <li onClick={mode} id="toggleMode" className="darkLight">
                        <div className="theme">
                            <FontAwesomeIcon icon={currentTheme ? faMoon : faSun} />   
                        </div>
                    </li>
                </ul>
                <ul className="socialNav">
                    <li><a href={data["social-links"].instagram} className="fa fa-instagram"></a></li>
                    <li><a href={data["social-links"].twitter} className="fa fa-twitter"></a></li>
                    <li><a href={data["social-links"].linkedIn} className="fa fa-linkedin"></a></li>
                    <li><a href={data["social-links"].github} className="fa fa-github"></a></li>
                </ul>
                
                <div className={`ham ${nav ? 'open' : ''}`} onClick={showNav}>
                    <span className="bar1"></span>
                    <span className="bar2"></span>
                    <span className="bar3"></span>
                </div>
                
            </div>
        </>
    );
}

export default Navbar;

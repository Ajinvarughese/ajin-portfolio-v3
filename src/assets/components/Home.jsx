import { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import About from './About/About';
import Skills from './Skills/Skills';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact'; 
import Data from './Data';
import { Fade } from 'easy-reveal';

function Home(props) {
    
    const jsonData = Data();
    const data = props.item;
    
     const handlePath = () => {
        if(props.path === 'true') {
            return ( 
            <Navbar 
                active = 'home'
            />
            )
        }
        return null;
    }

    const [currentSection, setCurrentSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {

            const homeSection = document.getElementById('home');
            const aboutSection = document.getElementById('about');
            const skillsSection = document.getElementById('skills');
            const projectsSection = document.getElementById('projects');
            const contactSection = document.getElementById('contact');

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition < aboutSection.offsetTop) {
                setCurrentSection('home');
            } else if (scrollPosition < skillsSection.offsetTop) {
                setCurrentSection('about');
            } else if(scrollPosition < projectsSection.offsetTop){
                setCurrentSection('skills');
            }else if(scrollPosition < contactSection.offsetTop) {
                setCurrentSection('projects');
            }else {
                setCurrentSection('contact');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyDfzQT33xb1Z0nzvFKJ2ZNyPU6cYoFRIhU");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const generateText = async () => {
        const text = await model.generateText({ prompt: "Write a short story about a person who is a programmer." });
        return text;
    }

    return (
        <>
            {handlePath()}
            <div className="main">
                <div className="header" id="home">
                    <Fade distance='10%' bottom duration={1500} >
                        <div className="header1">
                            <div className="titles">
                                <i><h2>{data.sub_title}</h2></i>
                                <i><h1>{data.title}</h1></i>
                                <i>
                                    <p>{data.desc}</p>
                                    <p>{generateText}</p>
                                </i>
                                <button>Scroll Down</button>
                            </div>
                            <div className="profile">
                                <img 
                                    src={data.image}
                                    alt="image of ajin varughese" 
                                />
                            </div>
                        </div>
                    </Fade>
                    <div className="header2"></div>
                </div>


                <div id="about">
                    <About 
                        item = {jsonData.about} 
                    />
                </div>
                
                <div id="skills">
                    <Skills
                        item = {jsonData.skills}
                        pageRef={currentSection} 
                    />
                </div>
                <div id="projects">
                    <Projects 
                        item = {jsonData.projects}
                    />
                </div>
                <div id="contact">
                    <Contact 
                        item = {jsonData.contact}
                    />
                </div>
            </div>
        </>
    );

}

export default Home;

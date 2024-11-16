import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, json } from 'react-router-dom';
import './App.css';
import About from './assets/components/About/About';
import Home from './assets/components/Home';
import Skills from './assets/components/Skills/Skills';
import Projects from './assets/components/Projects/Projects';
import Contact from './assets/components/Contact/Contact';
import Data from './assets/components/Data';
import NoPage from './assets/components/NoPage/NoPage';

function App() {
  const [position, setPosition] = useState(false);
  let handlePos = () => {
    setPosition((prev) => !prev);
  };

  const [theme, setTheme] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  
  useEffect(() => {
    const themeCookie = getCookie('theme'); 
    if (themeCookie) {
      themeCookie === 'dark' ? setTheme(false) : setTheme(true);
    }else {
      document.cookie = `theme=dark;path=/;`;
    }
  }, []);

  useEffect(() => {
    if(theme) {
      document.documentElement.classList.toggle('light-mode');
    }else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const jsonData = Data();

  useEffect(() => {
    window.addEventListener("blur", handlePos);
    return () => window.removeEventListener("blur", handlePos);
  }, []);

  useEffect(()=> {
    window.addEventListener("focus", handlePos);
    return () => window.removeEventListener("focus", handlePos);
  }, []);
  if(position) {
    document.title = `${jsonData.home.window_blur_title}`;
  
  }else {

    document.title = `${jsonData.home.window_title}`;
  }

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route 
            path='*'
            element = {
              <NoPage />
            }
          />
          <Route 
            path='/' 
            element=
            { 
              <Home 
                item = {jsonData.home}  
                path = 'true' 
              />
            }
          />
          <Route 
            path='/about' 
            element=
            {
              <About 
                item = {jsonData.about}
                path='true' 
              />
            }
          />

          <Route 
            path='/skills'
            element=
            {
              <Skills 
                item = {jsonData.skills}
                path='true' 
                pageRef= 'skills'
              />
            }
          />

          <Route 
            path='/projects'
            element=
            {
              <Projects
                item = {jsonData.projects}
                path='true' 
                pageRef= 'projects'
              />
            }
          />

          <Route 
            path='/contact'
            element=
            {
              <Contact
                item = {jsonData.contact} 
                path='true' 
                pageRef= 'contact'
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

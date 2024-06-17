import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

import { Fade } from "easy-reveal";

function Projects(props) {
    const handlePath = () => {
        if(props.path === 'true') {
            return <Navbar active='projects' />;
        }
        return null;
    }
    const data = props.item;
    
    
    const renderProject = (project, key) => {
    const projects = data[key];
    
    if (projects.key === 0) {
        return (
            <div key={project.key} className="t">
                <div className="projHeader1">
                    <h2>{project.name}</h2>
                    <p>{project.desc}</p>
                </div>
                <div className="projHeader2">
                    <img src={project.img} alt="project image" />
                </div>
            </div>
        );
    } else if (projects.key === 1 && projects.key + 1 === 2) {
        return (
            <div key={project.key} className="r">
                <div className="p1">
                    <div className="projHeader1">
                        <h2>{projects.name}</h2>
                        <p>{projects.desc}</p>
                    </div>
                    <div className="projHeader2">
                        <img src={projects.img} alt="project image" />
                    </div>
                </div>
                {key + 1 < data.length && (
                    <div key={data[key + 1].key} className="p2">
                        <div className="projHeader1">
                            <h2>{data[key + 1].name}</h2>
                            <p>{data[key + 1].desc}</p>
                        </div>
                        <div className="projHeader2">
                            <img src={data[key + 1].img} alt="project image" />
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div key={projects.key} className="t">
                <div className="projHeader1">
                    <h2>{projects.name}</h2>
                    <p>{projects.desc}</p>
                </div>
                <div className="projHeader2">
                    <img src={projects.img} alt="project image" />
                </div>
            </div>

        );
    }
};

const projectData = data
    .filter((project, key) => key !== 2)
    .map((project, key) => renderProject(project, key, data.length - 1));


    return (
        <>
            {handlePath()}
            <div className="projectsMain">
                <br />
                <div className="titleProjects">
                    <i><h1>My <span>Projects</span>.</h1></i>
                </div>

                <div className="projects">
                    <Fade bottom distance="20%" duration={1500}>
                        {projectData}
                    </Fade>
                </div>
            </div>
        </>
    );
}

export default Projects;

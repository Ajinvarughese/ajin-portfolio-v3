import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"; // Ensure Navbar is imported
import { Fade } from "easy-reveal";

function Skills(props) {

    const handlePath = () => {
        if (props.path === 'true') {
            return <Navbar active='skills' />;
        }
        return null;
    }

    const [languageCount, setLanguageCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [codingCount, setCodingCount] = useState(0);
    
    const langMax = parseInt(props.item.exp.languages);
    const projMax = parseInt(props.item.exp.projects);
    const codingMax = parseInt(props.item.exp.coding.num);

    useEffect(() => {
        if (props.pageRef === 'skills') {
            const interval = setInterval(() => {
                if (languageCount === langMax && projectCount === projMax && codingCount === codingMax) {
                    clearInterval(interval);
                } else {
                    setLanguageCount(prev => prev < langMax ? prev + 1 : prev);
                    setProjectCount(prev => prev < projMax ? prev + 1 : prev);
                    setCodingCount(prev => prev < codingMax ? (prev + 3 > codingMax ? codingMax : prev + 3) : prev);
                }
            }, 190);

            return () => clearInterval(interval);
        } else {
            setLanguageCount(0);
            setProjectCount(0);
            setCodingCount(0);
        }
    }, [props.pageRef, languageCount, projectCount, codingCount]);

    const redirectCard = (uri) => {
        window.location.href = uri;
    }

    const renderSkill = (skill, index) => (
        <Fade bottom distance="20%" duration={1500} delay={index * 300} key={skill.name}>
            <div className="card" onClick={() => redirectCard(skill.url)}>
                <div className={`imageSkill ${skill.animation ? 'reactImg' : skill.name === ''}`}>
                    <img src={skill.img} alt={`${skill.name} icon`} />
                </div>
                <div className="contentSkills">
                    <div className="titleSkills">{skill.name}</div>
                    <p>{skill.desc}</p>
                </div>
            </div>
        </Fade>
    );

    const skillsData = props.item.skills.map((skill, index) => renderSkill(skill, index));

    return (
        <>
            {handlePath()}
            <div className="skillsMain">
                <br />
                <div className="titleSkills">
                    <i><h1>My <span>Skills</span>.</h1></i>
                </div>
                <div className="headSkills">
                    <ul>
                        <li>
                            <h3>{languageCount}+</h3>
                            <p>Languages and Tools</p>
                        </li>
                        <li>
                            <h3>{projectCount}+</h3>
                            <p>Projects</p>
                        </li>
                        <li>
                            <h3>{codingCount}+</h3>
                            <p>{props.item.exp.coding.type} of coding</p>
                        </li>
                    </ul>
                </div>

                <div id='skills' className="skills">
                    {skillsData}
                </div>
            </div>
        </>
    )
}

export default Skills;

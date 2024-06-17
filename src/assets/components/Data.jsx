import NavData from '../json/Navbar.json';
import HomeData from '../json/Home.json';
import AboutData from '../json/About.json';
import SkillsData from '../json/Skills.json';
import ProjectsData from '../json/Projects.json';
import ContactData from '../json/Contact.json';

const Data = () => {
    const dataJson = {
        navbar: NavData,
        home: HomeData,
        about: AboutData,
        skills: SkillsData,
        projects: ProjectsData,
        contact: ContactData
    };
    return dataJson;
};

export default Data;

import Navbar from "../Navbar/Navbar";
import cvPdf from "../../pdf/AJINVARUGHESE.pdf";
import { Fade } from "easy-reveal";

function About(props) {
    const handlePath = () => {
        if(props.path === 'true') {
            return <Navbar active = 'about'/>
        }
        return null
    }
    const downloadCV = () => {
        window.open(cvPdf, '_blank');
    }
    return (
        <>
            {handlePath()}
            <div className="aboutMain">
                <br />
                <div className="aboutHeader1">
                    <i><h1>ABOUT <span>ME</span>.</h1></i>
                    <Fade bottom duration={1500} distance='10%'>
                        <div className="aboutSide1">
                            <div className="aboutImage">
                                    <img 
                                        src={props.item.image} 
                                        alt="about me image"
                                    />
                                <div className="borderImage"></div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Fade bottom distance="10%" duration={1500} delay={400}>
                    <div className="aboutHeader2">
                        <p>
                            {props.item.desc[0]}
                            <br />
                            <br />
                            {props.item.desc[1]}
                            <br />
                            <button onClick={downloadCV}>Download CV</button>
                        </p>
                    </div>
                </Fade>
            </div>
        </>
    )
}

export default About;
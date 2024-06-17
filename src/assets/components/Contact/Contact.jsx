import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import emailjs from "emailjs-com";
import successImg from "../../images/success.gif";
import { Fade } from "easy-reveal";
const Contact = (props) => {
    const handlePath = () => {
        if(props.path === 'true') {
            return <Navbar active='contact' />;
        }
        return null;
    }

    const data = props.item;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    let startLoading = () => {
        document.getElementById("aq").style.display = "block";
        document.getElementById("aw").style.display = "none";
    }
    let successMail = () => {
        document.getElementById('ld-img1').style.display = 'none';
        document.getElementById('ld-img2').style.display = 'block';
        document.getElementById('msgT').innerHTML = "Email has been sent";
        document.getElementById('msgC').innerHTML = "your email has been successfully sent";
    }
    let stopLoading = () => {
        document.getElementById("aq").style.display = 'none';
        document.getElementById('aw').style.display = 'block';

        document.getElementById('ld-img1').style.display = 'block';
        document.getElementById('ld-img2').style.display = 'none';
        document.getElementById('msgT').innerHTML = "Email is sending...";
        document.getElementById('msgC').innerHTML = "your email is getting ready to be sent.";

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        document.getElementById('message').value = '';
    }
    const sendEmail = (e) => {
        e.preventDefault();
        if(validateForm(name, email, subject, message)) {
            startLoading();
            let parms = {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
            emailjs.send(data.emailjs.service_id, data.emailjs.template_id, parms, data.emailjs.public_id)
            .then((result) => {
                if(result) {
                    successMail();
                    setTimeout(() => {
                        stopLoading();
                    }, 3500)
                }
            }, (error) => {
                console.log(error.text);
            });
        }
    }
    function validateForm() {
        let warn = document.getElementsByClassName('warn');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(name.length <= 0) {
            warn[0].innerHTML = "please enter your name";
            warn[0].style.display = 'block';
            return false;
        }else if(!emailRegex.test(email)) {
            warn[1].innerHTML = "please enter a valid email";
            warn[1].style.display = 'block';
            return false;
        }else if(subject.length <= 0) {
            warn[2].innerHTML = "please enter a subject";
            warn[2].style.display = 'block';
            return false;
        }else if(message.length <= 0) {
            warn[3].innerHTML = "please enter a message";
            warn[3].style.display = 'block';
            return false;
        }
        return true;
    }
    return (
        <>
            {handlePath()}
            <div className="contactMain">
                <br />
                <div className="contactHeader1">
                    <i><h1>CONTACT <span>ME</span>.</h1></i>
                    <p>Any question or remarks? Just write me a message!</p>
                </div>
                <div className="contactHeader2">
                    <div className="card1">
                        <h2>Get in touch</h2>
                        <Fade bottom duration={1500}>
                            <p><strong>Address:</strong> {data.owner_details.address}</p>
                        </Fade>
                        <Fade bottom duration={1500} delay={400}>
                            <p><strong>Phone:</strong> {data.owner_details.phone}</p>
                        </Fade>
                        <Fade bottom duration={1500} delay={800}>
                            <p><strong>Email:</strong> {data.owner_details.email}</p>
                        </Fade>
                    </div>
                    <div className="card2">
                        <div id="aq" className="mailLoading">
                            <div className="loaderImg">
                                <div id="ld-img1" className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div id="ld-img2" className="img">
                                    <img src={successImg} alt="email sent successfully" />
                                </div>
                            </div>
                            <hr />
                            <div className="contentMail">
                                <h3 id="msgT">Email is sending...</h3>
                                <p>Hey {name}, <p id="msgC">your email is getting ready to be sent.</p></p>
                            </div>
                        </div>

                        <div className="aw" id="aw">
                            <h2>
                                I'd love to hear from you! <br />
                                Let's get in touch
                            </h2>
                            <Fade duration={2500} distance="20%">
                                <form id="myForm" className="contact-form" onSubmit={sendEmail}>
                                    <input 
                                        className="name"
                                        type="text" 
                                        name="name" 
                                        value={name} 
                                        onChange={(e) => {
                                                setName(e.target.value);
                                                document.getElementsByClassName('warn')[0].style.display = 'none';
                                            }
                                        } 
                                        placeholder="Full name" />
                                    <p className="warn"></p>
                                    <input 
                                        className="email"
                                        type="text"
                                        name="email" 
                                        value={email} 
                                        onChange={(e) => {
                                                setEmail(e.target.value);
                                                document.getElementsByClassName('warn')[1].style.display = 'none';
                                            }
                                        }
                                        placeholder="Email or phone number" />
                                    <p className="warn"></p>
                                    <input 
                                        className="subject"
                                        type="text" 
                                        name="subject" 
                                        value={subject} 
                                        onChange={(e) => {
                                                setSubject(e.target.value);
                                                document.getElementsByClassName('warn')[2].style.display = 'none';
                                            }
                                        } 
                                        placeholder="Subject" />
                                    <p className="warn"></p>
                                    <textarea 
                                        name="message" 
                                        id="message"
                                        className="message" 
                                        cols="" 
                                        rows="8"
                                        onChange={(e) => {
                                                setMessage(e.target.value);
                                                document.getElementsByClassName('warn')[3].style.display = 'none';
                                            }
                                        }
                                        placeholder="Message"    
                                    >
                                    </textarea>
                                    <p className="warn"></p>
                                    <Fade bottom distance="70%" duration={1500} delay={200}>
                                        <input 
                                            type="submit" 
                                            value="Send email" 
                                        />
                                    </Fade>
                                </form>
                            </Fade>
                        </div>
                        
                    </div>
                </div>

                <div className="footer">
                    <p>&copy; {data.copyright}. All rights reserved.</p>
                </div>
            </div>
        </>
    )
}
export default Contact;

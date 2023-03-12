import React from 'react'
import Google from '../assets/img/google.png'
import Github from '../assets/img/github.png'
import LoginImage from '../assets/img/login.png'
import Logo from '../assets/img/logo.png'
import "../assets/styles/login.css"

const Login = () => {

    const google = () => {
        window.open("http://localhost:2023/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:2023/auth/github", "_self");
    };

    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='left'>
                    <div className='companyLogo'>
                        <h1 className='logoName'>BreakTheBreak</h1>
                        <img className='logoImg' src={Logo} alt="" />
                    </div>
                    <h1 className='loginTitle'>Welcome Back</h1>
                    <h1 className='loginSubtitle'><span>CONTINUE WITH</span></h1>
                    <div className='loginButton google' onClick={google}>
                        <img src={Google} alt="" className='icon' />
                        Google
                    </div>
                    <div className='loginButton github' onClick={github}>
                        <img src={Github} alt="" className='icon gh' />
                        Github
                    </div>
                </div>
                <div className='right'>
                    <div className='intro'>
                        <h1>BreakTheBreak</h1>
                        <p>Our app helps you increase your job security and find valuable job information.
                            In today's fast-paced world, job security is more important than ever,
                            and we understand how stressful it can be to search for reliable job information.
                            Whether you're looking to switch careers or want to climb the corporate ladder,
                            our app has everything you need to succeed.</p>
                        <button><a href="">LEARN MORE</a></button>
                    </div>
                    <img src={LoginImage} alt="" />
                    <a className='copyright' href="https://storyset.com/job">Job illustrations by Storyset</a>
                </div>
            </div>
        </div>
    )
}

export default Login
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginImage from '../assets/img/user.png'
import HomeIcon from '../assets/img/home.png'
import JobIcon from '../assets/img/job.png'
import ForumIcon from '../assets/img/chat.png'
import MarketIcon from '../assets/img/trend.png'
import ProfileIcon from '../assets/img/profile.png'
import '../assets/styles/sidebar.css';

const sidebarNavItems = [
    {
        display: 'Home',
        icon: <img className='icons' src={HomeIcon} alt="" />,
        to: '/read',
        section: ''
    },
    {
        display: 'Job Board',
        icon: <img className='icons' src={JobIcon} alt="" />,
        to: '/write/:id',
        section: 'started'
    },
    {
        display: 'Forum',
        icon: <img className='icons' src={ForumIcon} alt="" />,
        to: '/forum',
        section: 'calendar'
    },
    {
        display: 'Market Trends',
        icon: <img className='icons' src={MarketIcon} alt="" />,
        to: '/trend',
        section: 'user'
    },
    {
        display: 'Profile',
        icon: <img className='icons' src={ProfileIcon} alt="" />,
        to: '/profile',
        section: 'order'
    },
]

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:2023/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            }).then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            }).then((resObject) => {
                setUser(resObject.user);
            }).catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            <a href="http://localhost:3000/:id">BreakTheBreak</a>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
            <div className='sidebar-profile'>
                {user ? (
                    <ul className="list">
                        <li className="listItem">
                            {user.photos.length > 0 ? (
                                <img src={user.photos[0].value} referrerPolicy="no-referrer" alt="" className="avatar" />
                            ) : (
                                <img src={LoginImage} alt="" className="avatar" />
                            )}
                        </li>
                        <li className="listItem">{user.displayName}</li>
                    </ul>
                ) : (<Link to="/login">Login</Link>)}
            </div>
        </div>
    </div>;
};

export default Sidebar;
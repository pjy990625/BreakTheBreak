import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoginImage from '../assets/img/user.png'
import HomeIcon from '../assets/img/home.png'
import JobIcon from '../assets/img/job.png'
import ForumIcon from '../assets/img/chat.png'
import WriteIcon from '../assets/img/write.png'
import MarketIcon from '../assets/img/trend.png'
import ProfileIcon from '../assets/img/profile.png'
import '../assets/styles/sidebar.css';

const Sidebar = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const sidebarRef = useRef();

    const sidebarNavItems = [
        {
            display: 'Home',
            icon: <img className='icons' src={HomeIcon} alt="" />,
            to: `/${id}`,
            section: ''
        },
        {
            display: 'Job Board',
            icon: <img className='icons' src={JobIcon} alt="" />,
            to: `/job/${id}`,
            section: ''
        },
        {
            display: 'Forum',
            icon: <img className='icons' src={ForumIcon} alt="" />,
            to: `/forum/${id}`,
            section: ''
        },
        {
            display: 'Write a Post',
            icon: <img className='icons' src={WriteIcon} alt="" />,
            to: `/write/${id}`,
            section: ''
        },
        {
            display: 'Market Trends',
            icon: <img className='icons' src={MarketIcon} alt="" />,
            to: `/trend`,
            section: ''
        },
        {
            display: 'Profile',
            icon: <img className='icons' src={ProfileIcon} alt="" />,
            to: `/profile/${id}`,
            section: ''
        },
    ]

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

    return <div className='sidebar'>
        <div className="sidebar__logo">
            <a href="http://localhost:3000/:id">BreakTheBreak</a>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            {sidebarNavItems.map((item, index) => (
                <Link to={item.to} key={index}>
                    <div className={"sidebar__menu__item"}>
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
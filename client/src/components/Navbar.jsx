import { Link } from "react-router-dom";

const Navbar = ({ user }) => {

    const logout = () => {
        window.open("http://localhost:2023/auth/logout", "_self");
    };

    return (
        <div className="navbar">
            {user ? (
                <ul className="nav-list">
                    <li className="greeting">Hello {user.displayName}</li>
                    <li className="nav-listItem" onClick={logout}>Logout</li>
                </ul>
            ) : (<Link to="/login">Login</Link>)}
        </div>
    )
}

export default Navbar
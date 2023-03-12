import { Link } from "react-router-dom";

const Navbar = ({ user }) => {

    const logout = () => {
        window.open("http://localhost:2023/auth/logout", "_self");
    };

    return (
        <div className="navbar">
            {user ? (
                <div className="flex justify-between py-4 px-8">
                    <div className="greeting">Hello, {user.displayName}</div>
                    <div className="logout" onClick={logout}>Logout</div>
                </div>
            ) : (<Link to="/login">Login</Link>)}
        </div>
    )
}

export default Navbar
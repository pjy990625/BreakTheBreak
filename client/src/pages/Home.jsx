import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';
import "../../src/index.css";
import "../assets/styles/app.css";

const Home = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar user={user} />
        <div className="main">
          <h1 className=''>Home</h1>
          <Link to={id ? `/read/${id}` : "login"}>Read</Link>
          <Link to={id ? `/write/${id}` : "login"}>Write</Link>
        </div>
      </div>
    </>
  )
}

export default Home
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../../src/index.css";

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
    <div>
      <Navbar user={user} />
      <h1 className=''>Home</h1>
      <Link to={id ? `/read/${id}` : "login"}>Read</Link>
      <Link to={id ? `/write/${id}` : "login"}>Write</Link>
      <Footer />
    </div>
  )
}

export default Home
import React from 'react'
import { useParams, Link } from "react-router-dom";
import "../../src/index.css";

const Home = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className=''>Home</h1>
      <Link to={id ? `/read/${id}` : "login"}>Read</Link>
      <Link to={id ? `/write/${id}` : "login"}>Write</Link>
      <Link to={id ? `/profile/${id}` : "login"}>Profile</Link>
    </div>
  )
}

export default Home
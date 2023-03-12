import React from 'react'
import { useParams, Link } from "react-router-dom";

const Home = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Home</h1>
      <Link to={id ? `/read/${id}` : "login"}>Read</Link>
      <Link to={id ? `/write/${id}` : "login"}>Write</Link>
    </div>
  )
}

export default Home
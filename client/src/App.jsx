import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ReadPost from './pages/ReadPost';
import WritePost from './pages/WritePost';
import Trend from "./pages/Trend";
import Forum from './pages/Forum';
import JobBoard from "./pages/JobBoard";

import Profile from './pages/Profile';
import { Home, Login } from "./pages";
import { useEffect, useState } from 'react';
import "./assets/styles/app.css";

const App = () => {
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
      <BrowserRouter>
        <header className="w-full h-16 flex justify-between items-center bg-slate-50 px-4 border border-b-slate-200">
          <Link to="/">
            <span className='font-bold text-blue-900 text-2xl'>BreakTheBreak</span>
          </Link>
          <Link to="/login" className="font-inter font-base bg-blue-900 text-slate-50 px-4 py-[6px] rounded-lg">
            Login
          </Link>
        </header>
  
        <main className='p-5 w-full min-h-[calc(100vh-64px)]'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/read/:id" element={<ReadPost />} />
            <Route path="/write/:id" element={<WritePost />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
}

export default App;

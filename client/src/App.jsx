import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReadPost from './pages/ReadPost';
import WritePost from './pages/WritePost';
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
                <Routes>
                    <Route path="/login" element={user ? <Navigate to={`/${user.id}`} /> : <Login />} />
                    <Route path="/:id" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/read/:id" element={user ? <ReadPost /> : <Navigate to="/login" />} />
                    <Route path="/write/:id" element={user ? <WritePost /> : <Navigate to="/login" />} />
                </Routes>
        </BrowserRouter>
    );
}

export default App;

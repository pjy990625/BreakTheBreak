import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadPost from './pages/ReadPost';
import WritePost from './pages/WritePost';
import { Home, Login } from "./pages";
import { useEffect, useState } from 'react';

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
                <Route path="/login" element={<Login />} />
                <Route path="/:id" element={<Home />} />
                <Route path="/read/:id" element={<ReadPost />} />
                <Route path="/write/:id" element={<WritePost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

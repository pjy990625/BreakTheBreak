import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadPost from './pages/ReadPost';
import WritePost from './pages/WritePost';
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read/:id" element={<ReadPost />} />
        <Route path="/write/:id" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadPost from './pages/ReadPost';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReadPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

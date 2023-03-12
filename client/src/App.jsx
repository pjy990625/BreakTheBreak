import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ReadPost from './pages/ReadPost';
import WritePost from './pages/WritePost';
import Home from "./pages/Home";

const App = () => {
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
          <Route path="/:id" element={<Home />} />
          <Route path="/read/:id" element={<ReadPost />} />
          <Route path="/write/:id" element={<WritePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

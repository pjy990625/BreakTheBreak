import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';

const Trend = () => {
  const [rankings, setRankings] = useState([]);

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
        throw new Error("authentication has failed!");
      }).then((resObject) => {
        setUser(resObject.user);
      }).catch((err) => {
        console.log(err);
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const getTiobe = async () => {
      const response = await fetch("http://localhost:2023/api/post/tiobe");
      const result = await response.json();
      setRankings(result);
    };

    getTiobe();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar user={user} />
        <div className="main">
          <h2 className="text-bice-blue text-2xl font-bold mb-5">Market Trends</h2>
          {rankings.length === 0 ? (
            <div className="text-slate-700 font-semibold text-lg">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-bice-blue text-white">
                <tr className="text-left">
                  <th className="pl-3 py-1">Ranking</th>
                  <th className="pl-3 py-1" colSpan="2">Programming Language</th>
                  <th className="pl-3 py-1">Rating</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((item, index) => {
                  return (
                    <tr className={`text-slate-500 font-semibold text-left ${(index % 2 !== 0) ? "bg-slate-200" : "bg-slate-100"}`}>
                      <td className="pl-3 py-3">{item.rank}</td>
                      <td className="pl-3 py-3"><img src={`https://www.tiobe.com/${item.logoSrc}`} alt="logo" /></td>
                      <td className="pl-3 py-3">{item.language}</td>
                      <td className="pl-3 py-3">{item.rating}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default Trend;